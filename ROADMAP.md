# SSHMan - SSH CLI Aracı Geliştirme Yol Haritası

## Proje Özeti
Çoklu SSH sunucularını kolayca yönetmek için geliştirilecek "SSHMan" isimli Node.js tabanlı CLI aracı.

## Ana Özellikler
- ✅ Sunucu bilgilerini kaydetme (alias, IP, port, kullanıcı adı)
- ✅ Kayıtlı sunucuları listeleme
- ✅ Hızlı SSH bağlantısı kurma
- ✅ Sunucu bilgilerini güncelleme/silme
- ✅ Konfigürasyon dosyası yönetimi

## Görevler

### ✅ TAMAMLANAN GÖREVLER
- [x] **Proje yapısını ve gereksinimlerini analiz et**
  - ✅ Mevcut dizin yapısını kontrol edildi
  - ✅ Gerekli NPM paketleri belirlendi
  - ✅ CLI komut yapısı planlandı

- [x] **CLI aracı için temel NPM projesi kurulumunu yap**
  - ✅ package.json oluşturuldu
  - ✅ Gerekli dependencies eklendi (commander.js, inquirer, chalk, fs-extra)
  - ✅ Temel dizin yapısı oluşturuldu
  - ✅ Entry point belirlendi

- [x] **Sunucu kaydetme fonksiyonalitesini geliştir**
  - ✅ Server bilgilerini kaydetme modülü
  - ✅ Validation kontrolleri eklendi
  - ✅ Duplicate kontrolü eklendi
  - ✅ JSON formatında local storage

- [x] **Sunucu listeleme fonksiyonalitesini geliştir**
  - ✅ Tüm sunucuları listeleme
  - ✅ Tablo formatında gösterim
  - ✅ Renklendirme ve formatting

- [x] **SSH bağlantı fonksiyonalitesini geliştir**
  - ✅ SSH connection module
  - ✅ Error handling
  - ✅ Interactive terminal
  - ✅ Last connected tracking

- [x] **CLI komutlarını ve argümanlarını tasarla**
  - ✅ `sshman add <ip/hostname>` - Sunucu ekleme
  - ✅ `sshman list` - Sunucuları listeleme  
  - ✅ `sshman connect <alias>` - Bağlantı kurma
  - ✅ `sshman remove <alias>` - Sunucu silme
  - ✅ `sshman edit <alias>` - Sunucu güncelleme

- [x] **Konfigürasyon dosyası yönetimini ekle**
  - ✅ ~/.sshman/config.json dosya yönetimi
  - ✅ Otomatik dizin oluşturma
  - ✅ Server bilgilerini güvenli kaydetme

### 📋 YAPILACAK GÖREVLER

- [ ] **Test senaryolarını yazma ve test etme**
  - Unit testler
  - Integration testler
  - CLI komut testleri

#### Düşük Öncelik  
- [ ] **Dokümantasyon ve README hazırlama**
  - Kullanım kılavuzu
  - Kurulum talimatları
  - Örnekler ve use case'ler

## Teknik Detaylar

### Kullanılacak Teknolojiler
- **Node.js** - Runtime environment
- **Commander.js** - CLI framework
- **Inquirer.js** - Interactive prompts
- **node-ssh** - SSH connection
- **chalk** - Terminal styling
- **fs-extra** - File system operations

### Dosya Yapısı
```
sshman/
├── bin/
│   └── sshman.js           # CLI entry point
├── src/
│   ├── commands/
│   │   ├── add.js          # Sunucu ekleme
│   │   ├── list.js         # Sunucu listeleme
│   │   ├── connect.js      # SSH bağlantı
│   │   ├── remove.js       # Sunucu silme
│   │   └── edit.js         # Sunucu düzenleme
│   ├── utils/
│   │   ├── config.js       # Konfigürasyon yönetimi
│   │   ├── ssh.js          # SSH utilities
│   │   └── validation.js   # Input validation
│   └── index.js
├── tests/
├── package.json
├── README.md
└── ROADMAP.md
```

### CLI Komut Örnekleri
```bash
# Sunucu ekleme
sshman add 1.1.1.1
sshman add myserver.com --alias prod

# Sunucuları listeleme
sshman list
sshman ls

# SSH bağlantısı
sshman connect myserver
sshman c myserver

# Sunucu silme
sshman remove myserver
sshman rm myserver

# Sunucu düzenleme
sshman edit myserver
```

### Veri Yapısı
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
  }
}
```

## İlerleme Takibi
- **Başlangıç Tarihi**: 2025-01-01
- **Tahmini Bitiş**: TBD
- **Mevcut Durum**: Planlama aşamasında

---
*Bu dokümantasyon proje ilerledikçe güncellenecektir.*