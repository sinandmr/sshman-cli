const { spawn } = require('child_process');
const chalk = require('chalk');
const config = require('../utils/config');

function connectCommand(alias) {
  try {
    const server = config.getServer(alias);

    if (!server) {
      console.error(chalk.red(`Error: Server '${alias}' not found`));
      console.log(chalk.gray('Use "sshman list" to see available servers'));
      process.exit(1);
    }

    console.log(chalk.blue(`🔌 Connecting to ${server.alias} (${server.host}:${server.port})...`));
    
    // Update last connected time
    config.updateLastConnected(alias);

    // Build SSH command
    const sshArgs = [
      `${server.username}@${server.host}`,
      '-p', server.port.toString()
    ];

    // Spawn SSH process
    const sshProcess = spawn('ssh', sshArgs, {
      stdio: 'inherit',
      shell: false
    });

    sshProcess.on('error', (error) => {
      if (error.code === 'ENOENT') {
        console.error(chalk.red('Error: SSH command not found. Please install OpenSSH client.'));
      } else {
        console.error(chalk.red(`Error: ${error.message}`));
      }
      process.exit(1);
    });

    sshProcess.on('close', (code) => {
      if (code === 0) {
        console.log(chalk.green('✓ SSH connection closed'));
      } else {
        console.log(chalk.yellow(`SSH connection closed with code ${code}`));
      }
    });

  } catch (error) {
    console.error(chalk.red(`Error: ${error.message}`));
    process.exit(1);
  }
}

module.exports = connectCommand;