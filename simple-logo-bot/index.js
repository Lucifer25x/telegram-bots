const { Telegraf } = require('telegraf');
//const config = require('dotenv').config();
const bot = new Telegraf(process.env.TOKEN);
const fs = require('fs');
const { exec } = require("child_process");

bot.start(ctx=>{
    ctx.reply('hey')
})

bot.command('get', ctx=>{
    const msg = ctx.update.message.text;
    const name = msg.slice(5, msg.length);
    fs.writeFileSync('name.txt', name);
    exec("py app.py", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        bot.telegram.sendPhoto(ctx.chat.id, { source: 'logo.jpg' })
    });
})

bot.launch();
