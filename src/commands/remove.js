const chalk = require('chalk');
const inquirer = require('inquirer');
const config = require('../utils/config');

async function removeCommand(alias) {
  try {
    const server = config.getServer(alias);

    if (!server) {
      console.error(chalk.red(`Error: Server '${alias}' not found`));
      console.log(chalk.gray('Use "sshman list" to see available servers'));
      process.exit(1);
    }

    // Show server info
    console.log(chalk.yellow(`\n📋 Server to remove:`));
    console.log(chalk.gray(`  Alias: ${server.alias}`));
    console.log(chalk.gray(`  Host: ${server.host}:${server.port}`));
    console.log(chalk.gray(`  Username: ${server.username}`));
    if (server.description) {
      console.log(chalk.gray(`  Description: ${server.description}`));
    }

    // Confirm removal
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `Are you sure you want to remove server '${alias}'?`,
        default: false
      }
    ]);

    if (!confirm) {
      console.log(chalk.yellow('Operation cancelled'));
      return;
    }

    // Remove server
    const removed = config.removeServer(alias);

    if (removed) {
      console.log(chalk.green(`✓ Server '${alias}' removed successfully`));
    } else {
      console.error(chalk.red(`Error: Failed to remove server '${alias}'`));
      process.exit(1);
    }

  } catch (error) {
    console.error(chalk.red(`Error: ${error.message}`));
    process.exit(1);
  }
}

module.exports = removeCommand;