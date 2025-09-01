const chalk = require('chalk');
const inquirer = require('inquirer');
const config = require('../utils/config');
const { isValidHost, isValidPort, isValidAlias } = require('../utils/validation');

async function editCommand(alias) {
  try {
    const server = config.getServer(alias);

    if (!server) {
      console.error(chalk.red(`Error: Server '${alias}' not found`));
      console.log(chalk.gray('Use "sshman list" to see available servers'));
      process.exit(1);
    }

    console.log(chalk.blue(`\n✏️  Editing server '${alias}'`));
    console.log(chalk.gray('Leave fields empty to keep current values\n'));

    // Ask for new values
    const questions = [
      {
        type: 'input',
        name: 'host',
        message: 'Host:',
        default: server.host,
        validate: (input) => {
          if (!input.trim()) return true; // Allow empty for no change
          return isValidHost(input) || 'Invalid host address';
        }
      },
      {
        type: 'input',
        name: 'port',
        message: 'Port:',
        default: server.port.toString(),
        validate: (input) => {
          if (!input.trim()) return true; // Allow empty for no change
          return isValidPort(input) || 'Invalid port number (1-65535)';
        }
      },
      {
        type: 'input',
        name: 'username',
        message: 'Username:',
        default: server.username,
        validate: (input) => input.trim().length > 0 || 'Username is required'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description:',
        default: server.description || ''
      },
      {
        type: 'input',
        name: 'newAlias',
        message: 'Alias:',
        default: server.alias,
        validate: (input) => {
          if (!input.trim()) return 'Alias is required';
          if (input === server.alias) return true; // Same alias is OK
          
          if (!isValidAlias(input)) {
            return 'Invalid alias. Use only alphanumeric characters, hyphens, and underscores';
          }

          // Check if new alias already exists
          const existingServer = config.getServer(input);
          if (existingServer) {
            return `Server with alias '${input}' already exists`;
          }
          
          return true;
        }
      }
    ];

    const answers = await inquirer.prompt(questions);

    // Prepare updates
    const updates = {
      host: answers.host || server.host,
      port: answers.port ? parseInt(answers.port) : server.port,
      username: answers.username || server.username,
      description: answers.description
    };

    // Handle alias change
    if (answers.newAlias && answers.newAlias !== server.alias) {
      // Remove old server and add with new alias
      config.removeServer(alias);
      config.addServer(answers.newAlias, {
        ...updates,
        alias: answers.newAlias,
        createdAt: server.createdAt,
        lastConnected: server.lastConnected
      });
      console.log(chalk.green(`✓ Server updated and renamed from '${alias}' to '${answers.newAlias}'`));
    } else {
      // Update existing server
      updates.alias = server.alias;
      config.updateServer(alias, updates);
      console.log(chalk.green(`✓ Server '${alias}' updated successfully`));
    }

    // Show updated info
    const updatedAlias = answers.newAlias || alias;
    const updatedServer = config.getServer(updatedAlias);
    console.log(chalk.gray(`  Host: ${updatedServer.host}:${updatedServer.port}`));
    console.log(chalk.gray(`  Username: ${updatedServer.username}`));
    if (updatedServer.description) {
      console.log(chalk.gray(`  Description: ${updatedServer.description}`));
    }

  } catch (error) {
    console.error(chalk.red(`Error: ${error.message}`));
    process.exit(1);
  }
}

module.exports = editCommand;