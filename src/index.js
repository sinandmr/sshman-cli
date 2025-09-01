// Main entry point for the SSHMan CLI application
// This file is referenced in package.json as the main entry point

module.exports = {
  config: require('./utils/config'),
  validation: require('./utils/validation'),
  commands: {
    add: require('./commands/add'),
    list: require('./commands/list'),
    connect: require('./commands/connect'),
    remove: require('./commands/remove'),
    edit: require('./commands/edit')
  }
};