const chalk = require('chalk');
const config = require('../utils/config');

function listCommand() {
  try {
    const servers = config.getAllServers();
    const serverList = Object.values(servers);

    if (serverList.length === 0) {
      console.log(chalk.yellow('No servers saved yet.'));
      console.log(chalk.gray('Use "sshman add <host>" to add a server.'));
      return;
    }

    console.log(chalk.bold('\n📋 Saved SSH Servers:\n'));

    // Create table headers
    const headers = ['Alias', 'Host', 'Port', 'Username', 'Description', 'Last Connected'];
    const columnWidths = [15, 20, 6, 15, 25, 18];

    // Print headers
    let headerLine = '';
    headers.forEach((header, index) => {
      headerLine += chalk.bold.cyan(header.padEnd(columnWidths[index]));
    });
    console.log(headerLine);

    // Print separator
    let separatorLine = '';
    columnWidths.forEach(width => {
      separatorLine += '─'.repeat(width);
    });
    console.log(chalk.gray(separatorLine));

    // Print server data
    serverList.forEach(server => {
      const lastConnected = server.lastConnected 
        ? new Date(server.lastConnected).toLocaleDateString()
        : 'Never';

      const row = [
        server.alias,
        `${server.host}`,
        server.port.toString(),
        server.username,
        (server.description || '').substring(0, 22) + (server.description && server.description.length > 22 ? '...' : ''),
        lastConnected
      ];

      let rowLine = '';
      row.forEach((cell, index) => {
        const paddedCell = cell.padEnd(columnWidths[index]);
        if (index === 0) {
          rowLine += chalk.green(paddedCell); // Alias in green
        } else if (index === 1) {
          rowLine += chalk.yellow(paddedCell); // Host in yellow
        } else {
          rowLine += paddedCell;
        }
      });
      console.log(rowLine);
    });

    console.log(chalk.gray(`\n📊 Total servers: ${serverList.length}`));
    console.log(chalk.gray('💡 Use "sshman connect <alias>" to connect to a server'));

  } catch (error) {
    console.error(chalk.red(`Error: ${error.message}`));
    process.exit(1);
  }
}

module.exports = listCommand;