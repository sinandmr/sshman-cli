const chalk = require('chalk');
const inquirer = require('inquirer');
const config = require('../utils/config');
const { isValidHost, isValidPort, isValidAlias, generateAlias } = require('../utils/validation');

async function addCommand(host, options) {
  try {
    // Validate host
    if (!isValidHost(host)) {
      console.error(chalk.red('Error: Invalid host address'));
      process.exit(1);
    }

    // Validate port
    if (!isValidPort(options.port)) {
      console.error(chalk.red('Error: Invalid port number'));
      process.exit(1);
    }

    // Generate or validate alias
    let alias = options.alias || generateAlias(host);
    
    if (!isValidAlias(alias)) {
      console.error(chalk.red('Error: Invalid alias. Use only alphanumeric characters, hyphens, and underscores'));
      process.exit(1);
    }

    // Check if alias already exists
    const existingServer = config.getServer(alias);
    if (existingServer) {
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: `Server with alias '${alias}' already exists. Overwrite?`,
          default: false
        }
      ]);

      if (!overwrite) {
        console.log(chalk.yellow('Operation cancelled'));
        return;
      }
    }

    // Collect missing information
    const questions = [];

    if (!options.user) {
      questions.push({
        type: 'input',
        name: 'username',
        message: 'Enter username:',
        validate: (input) => input.trim().length > 0 || 'Username is required'
      });
    }

    if (!options.description) {
      questions.push({
        type: 'input',
        name: 'description',
        message: 'Enter description (optional):',
        default: ''
      });
    }

    const answers = await inquirer.prompt(questions);

    // Prepare server data
    const serverData = {
      alias,
      host,
      port: parseInt(options.port),
      username: options.user || answers.username,
      description: options.description || answers.description || ''
    };

    // Save server
    config.addServer(alias, serverData);

    console.log(chalk.green(`✓ Server '${alias}' added successfully!`));
    console.log(chalk.gray(`  Host: ${host}:${options.port}`));
    console.log(chalk.gray(`  Username: ${serverData.username}`));
    if (serverData.description) {
      console.log(chalk.gray(`  Description: ${serverData.description}`));
    }

  } catch (error) {
    console.error(chalk.red(`Error: ${error.message}`));
    process.exit(1);
  }
}

module.exports = addCommand;