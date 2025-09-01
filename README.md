# SSHMan CLI - SSH Connection Manager

[![npm version](https://badge.fury.io/js/sshman-cli.svg)](https://badge.fury.io/js/sshman-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🚀 Çoklu SSH sunucularını kolayca yönetmek için geliştirilmiş CLI aracı.

## Özellikler

- ✅ Sunucu bilgilerini kaydetme (alias, IP, port, kullanıcı adı)
- ✅ Kayıtlı sunucuları listeleme
- ✅ Hızlı SSH bağlantısı kurma
- ✅ Sunucu bilgilerini güncelleme/silme
- ✅ Konfigürasyon dosyası yönetimi

## Kurulum

### Gereksinimler
- Node.js (v14+)
- npm
- SSH client (OpenSSH)

### NPM ile Kurulum (Önerilen)

```bash
# Global olarak kur
npm install -g sshman-cli

# Hemen kullanmaya başla
sshman --help
```

### Manuel Kurulum

1. **Projeyi klonla/indir:**
   ```bash
   git clone <repo-url>
   cd sshman-cli
   ```

2. **Kurulum scriptini çalıştır:**
   ```bash
   chmod +x install.sh
   sudo ./install.sh
   ```

### Geliştiriciler için Manuel Kurulum

```bash
# Dependencies kur
npm install

# Executable yap
chmod +x bin/sshman.js

# Global komut oluştur
sudo ln -sf $(pwd)/bin/sshman.js /usr/local/bin/sshman
```

## Kullanım

### Sunucu Ekleme
```bash
# Basit ekleme
sshman add 192.168.1.100

# Detaylı ekleme
sshman add 192.168.1.100 --user admin --alias myserver --port 2222 --description "Production server"
```

### Sunucuları Listeleme
```bash
sshman list
# veya
sshman ls
```

### SSH Bağlantısı
```bash
sshman connect myserver
# veya
sshman c myserver
```

### Sunucu Silme
```bash
sshman remove myserver
# veya
sshman rm myserver
```

### Sunucu Düzenleme
```bash
sshman edit myserver
```

## Komut Referansı

| Komut | Kısaltma | Açıklama |
|-------|----------|----------|
| `sshman add <host>` | - | Yeni sunucu ekle |
| `sshman list` | `ls` | Sunucuları listele |
| `sshman connect <alias>` | `c` | Sunucuya bağlan |
| `sshman remove <alias>` | `rm` | Sunucu sil |
| `sshman edit <alias>` | - | Sunucu düzenle |
| `sshman --help` | `-h` | Yardım göster |
| `sshman --version` | `-V` | Versiyon göster |

### Add Komutu Seçenekleri

- `-p, --port <port>` - SSH portu (varsayılan: 22)
- `-u, --user <username>` - Kullanıcı adı
- `-a, --alias <alias>` - Sunucu takma adı
- `-d, --description <description>` - Açıklama

## Konfigürasyon

Sunucu bilgileri `~/.sshman/config.json` dosyasında saklanır.

### Örnek Konfigürasyon:
```json
{
  "servers": {
    "myserver": {
      "alias": "myserver",
      "host": "192.168.1.100",
      "port": 22,
      "username": "admin",
      "description": "Production server",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "lastConnected": "2025-01-01T00:00:00.000Z"
    }
  },
  "settings": {
    "defaultPort": 22,
    "connectionTimeout": 30000
  }
}
```

## Kaldırma

```bash
# Global komutu kaldır
sudo rm /usr/local/bin/sshman

# Konfigürasyon dosyalarını sil (isteğe bağlı)
rm -rf ~/.sshman
```

## Sorun Giderme

### "command not found: sshman"
```bash
# Yeniden kur
sudo ./install.sh

# Shell'i yeniden başlat
exec $SHELL
```

### "SSH command not found"
```bash
# macOS
brew install openssh

# Ubuntu/Debian
sudo apt install openssh-client

# CentOS/RHEL
sudo yum install openssh-clients
```

## Lisans

MIT License

## Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın