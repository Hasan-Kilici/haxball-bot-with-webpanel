# haxball-bot-with-webpanel

### Nasıl çalıştırılır?
İlk olarak klasörü indirin, bot klasörünü açın ve .env dosyasını aşağıdaki formatı takip ederek düzenleyin.
```env
TOKEN="token"
JoinWebhook="discord webhookUrl"
MessageWebhook="discord webhookUrl"
```
Botu çalıtırmak için sırayla 
```sh
cd bot
node main.js
```
Komutlarını çalıştırın.

Web sitesini çalıştırmak için 2.bir terminal açın ve
```sh
cd frontend
npm run dev
```
Komutlarını çalıştırın.


### İçindekiler
- Harita değiştirme
- Kullanıcıyı büyütme/ışınlama/hızlandırma/durdurma/susturma/banlama/kickleme
- Haritaların özel mekanikleri (dodgeball/hırsız polis/power/futsal)

### Kullanılan Teknolojiler
Backend : Fastify
Haxball Headless : haxball.js
Frontend : Sveltekit

### Panelden görseller
![image](https://github.com/Hasan-Kilici/haxball-bot-with-webpanel/assets/105741983/86d56eb9-ad42-405e-9f73-4f58a722241a)
