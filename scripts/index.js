require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const { TOKEN, SERVER_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL + URI;

const app = express();
app.use(bodyParser.json());

const init = async () => {
    const api = `${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`;
    const res = await axios.get(api);
    console.log(res.data);
};

app.post(URI, async (req, res) => {
    console.log(req.body);

    const chatId = req.body.message.chat.id;
    const text = req.body.message.text;
    const responseMap = {
        'wibu': 'japan is good ! UwU',
        'kakalak': 'secret key-word !!!',
    }
    const resMessage = responseMap[text] ? responseMap[text] : text;
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: resMessage,
    });

    return res.send();
});


app.listen(8081, async () => {
    console.log('app running on port ', 8081);
    await init();
});





