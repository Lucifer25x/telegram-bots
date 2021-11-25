const { Telegraf } = require('telegraf');

const bot = new Telegraf();

bot.start(ctx => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    `Etiket: @${ctx.chat.username}\nAd: ${ctx.chat.first_name}\nID: ${
      ctx.chat.id
    }\n\nCreated by Lucifer25x
  `
  );
});

bot.on('message', ctx => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    `Etiket: @${ctx.chat.username}\nAd: ${ctx.chat.first_name}\nID: ${
      ctx.chat.id
    }\n\nCreated by Lucifer25x
  `
  );
});

bot.launch();
