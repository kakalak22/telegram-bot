require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api');
const { TOKEN, SERVER_URL } = process.env;
const fs = require("fs");

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];

    bot.sendMessage(chatId, resp);
});

bot.onText(/\/sendImage (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    const buffer = fs.readFileSync(`./resources/images/${resp}.png`);
    console.log(buffer);
    bot.sendPhoto(chatId, buffer);
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Received your message');
});



bot.on('photo', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Received your photo');
});