#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const packageJson = require('../package.json');

const addCommand = require('../src/commands/add');
const listCommand = require('../src/commands/list');
const connectCommand = require('../src/commands/connect');
const removeCommand = require('../src/commands/remove');
const editCommand = require('../src/commands/edit');

const program = new Command();

program
  .name('sshman')
  .description('SSH connection manager CLI tool')
  .version(packageJson.version);

// Add command
program
  .command('add <host>')
  .description('Add a new SSH server')
  .option('-p, --port <port>', 'SSH port (default: 22)', '22')
  .option('-u, --user <username>', 'Username for SSH connection')
  .option('-a, --alias <alias>', 'Alias for the server')
  .option('-d, --description <description>', 'Description for the server')
  .action(addCommand);

// List command
program
  .command('list')
  .alias('ls')
  .description('List all saved SSH servers')
  .action(listCommand);

// Connect command
program
  .command('connect <alias>')
  .alias('c')
  .description('Connect to a saved SSH server')
  .action(connectCommand);

// Remove command
program
  .command('remove <alias>')
  .alias('rm')
  .description('Remove a saved SSH server')
  .action(removeCommand);

// Edit command
program
  .command('edit <alias>')
  .description('Edit a saved SSH server')
  .action(editCommand);

// Parse command line arguments
program.parse();

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}