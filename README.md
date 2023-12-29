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
![image](https://github.com/Hasan-Kilici/haxball-bot-with-webpanel/assets/105741983/fbec2c53-d484-48b2-96a5-5b039e9adfe5)


![image](https://github.com/Hasan-Kilici/haxball-bot-with-webpanel/assets/105741983/6db66412-66d9-4d9c-bf2d-21cebe292963)

