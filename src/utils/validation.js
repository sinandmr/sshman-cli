const net = require('net');

function isValidHost(host) {
  // Check if it's a valid IP address
  if (net.isIP(host)) {
    return true;
  }

  // Check if it's a valid hostname
  const hostnameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return hostnameRegex.test(host);
}

function isValidPort(port) {
  const portNum = parseInt(port, 10);
  return !isNaN(portNum) && portNum >= 1 && portNum <= 65535;
}

function isValidAlias(alias) {
  // Alias should be alphanumeric with hyphens and underscores
  const aliasRegex = /^[a-zA-Z0-9_-]+$/;
  return aliasRegex.test(alias) && alias.length >= 1 && alias.length <= 50;
}

function generateAlias(host) {
  // Generate a default alias from the host
  return host.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase();
}

module.exports = {
  isValidHost,
  isValidPort,
  isValidAlias,
  generateAlias
};