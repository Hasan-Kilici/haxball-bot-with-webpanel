const axios = require('axios');
require('dotenv').config();

module.exports= { 
    JoinLeaveLog : (message) =>{
        let params = {
            avatar_url: '',
            username: 'Giriş Çıkış',
            content: message
        };

        axios.post(process.env.JoinWebhook, params, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            console.log("Message sent to Discord successfully:", response.data);
        })
        .catch(error => {
            console.error("Error sending message to Discord:", error.response.data);
        });
    },
    MessageLog : (message) =>{
        let params = {
            avatar_url: '',
            username: 'Mesajlar',
            content: message
        };

        axios.post(process.env.MessageWebhook, params, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            console.log("Message sent to Discord successfully:", response.data);
        })
        .catch(error => {
            console.error("Error sending message to Discord:", error.response.data);
        });
    }
}