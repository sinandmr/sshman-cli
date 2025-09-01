const fs = require('fs-extra');
const path = require('path');
const os = require('os');

const CONFIG_DIR = path.join(os.homedir(), '.sshman');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

class Config {
  constructor() {
    this.ensureConfigExists();
  }

  ensureConfigExists() {
    if (!fs.existsSync(CONFIG_DIR)) {
      fs.mkdirSync(CONFIG_DIR, { recursive: true });
    }

    if (!fs.existsSync(CONFIG_FILE)) {
      const defaultConfig = {
        servers: {},
        settings: {
          defaultPort: 22,
          connectionTimeout: 30000
        }
      };
      fs.writeFileSync(CONFIG_FILE, JSON.stringify(defaultConfig, null, 2));
    }
  }

  load() {
    try {
      return fs.readJsonSync(CONFIG_FILE);
    } catch (error) {
      throw new Error(`Failed to load config: ${error.message}`);
    }
  }

  save(config) {
    try {
      fs.writeJsonSync(CONFIG_FILE, config, { spaces: 2 });
    } catch (error) {
      throw new Error(`Failed to save config: ${error.message}`);
    }
  }

  addServer(alias, serverData) {
    const config = this.load();
    config.servers[alias] = {
      ...serverData,
      createdAt: new Date().toISOString(),
      lastConnected: null
    };
    this.save(config);
  }

  getServer(alias) {
    const config = this.load();
    return config.servers[alias];
  }

  getAllServers() {
    const config = this.load();
    return config.servers;
  }

  removeServer(alias) {
    const config = this.load();
    if (config.servers[alias]) {
      delete config.servers[alias];
      this.save(config);
      return true;
    }
    return false;
  }

  updateServer(alias, updates) {
    const config = this.load();
    if (config.servers[alias]) {
      config.servers[alias] = {
        ...config.servers[alias],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.save(config);
      return true;
    }
    return false;
  }

  updateLastConnected(alias) {
    const config = this.load();
    if (config.servers[alias]) {
      config.servers[alias].lastConnected = new Date().toISOString();
      this.save(config);
    }
  }
}

module.exports = new Config();