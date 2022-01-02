const { Telegraf } = require('telegraf');
// const config = require('dotenv').config();
const bot = new Telegraf(process.env.TOKEN);
let reader;
let msgText;

bot.start(ctx => {
    bot.telegram.sendMessage(
        ctx.chat.id,
        'Salam. Özəl bir şəxsə hər hansısa bir qrupda mesaj yazmaq üçün hazırlanmış bota xoş gəldin.\nLakin bu botu işlətmək üçün mesajı oxumalı olan tərəfin username-ə ehtiyacı var.\nBotu necə işlədəcəyini öyrənmək üçün /help yazın.'
    )
})

bot.command('help', ctx => {
    bot.telegram.sendMessage(
        ctx.chat.id,
        '/for @uname={username} content={Content text}\n\nMəsələn:\n/for @uname=lucifer content=Hello, How are you?'
    )
})

bot.command('for', ctx => {
    if (ctx.chat.type != 'private') {
        const unameRegex = /@uname/;
        const contentRegex = /content/;
        const msg = ctx.update.message.text;
        const id = ctx.update.message.message_id;
        const usr = ctx.update.message.from.username;
        bot.telegram.deleteMessage(ctx.chat.id, id);
        if (!unameRegex.test(msg) || !contentRegex.test(msg)) {
            bot.telegram.sendMessage(
                ctx.chat.id,
                "Botu doğru işlətmirsiniz. Əgər doğru işlətmək qaydasını bilmirsinizsə /help yazaraq öyrənin."
            )
        } else {
            const uname = msg.indexOf("uname=") + 6;
            const txt = msg.indexOf("content=") + 8;
            const user = msg.slice(uname, txt - 9);
            const content = msg.slice(txt, msg.length);
            reader = user;
            msgText = content;
            if(txt == '' || content == ''){
                bot.telegram.sendMessage(
                    ctx.chat.id,
                    "Botu doğru işlətmirsiniz. Əgər doğru işlətmək qaydasını bilmirsinizsə /help yazaraq öyrənin."
                )
            } else {
                if (usr != undefined) {
                    bot.telegram.sendMessage(
                        ctx.chat.id,
                        `@${user} - click for reading message. (Message sended by @${usr})`,
                        {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: 'Click', callback_data: 'alert' }]
                                ]
                            }
                        }
                    )
                } else {
                    bot.telegram.sendMessage(
                        ctx.chat.id,
                        `@${user} - click for reading message. (Message sended by ${ctx.update.message.from.id})`,
                        {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: 'Click', callback_data: 'alert' }]
                                ]
                            }
                        }
                    )
                }
            }
        }
    } else {
        bot.telegram.sendMessage(
            ctx.chat.id,
            'Bu bot qruplarda istifadə üçün nəzərdə tutulub.'
        )
    }
})

bot.action('alert', ctx => {
    const clickedBy = ctx.update.callback_query.from.username;
    if (clickedBy == reader) {
        ctx.answerCbQuery(msgText);
    } else {
        ctx.answerCbQuery(`You are not @${reader}`);
    }
})

bot.launch();
