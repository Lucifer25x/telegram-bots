
const { Telegraf } = require('telegraf');
const bot = new Telegraf('');


var herf;
var isPlaying;
var player;

bot.start(ctx => {
    bot.telegram.sendMessage(
        ctx.chat.id,
        `${String.fromCodePoint(0x1F48E)} Oyun botuna xoş gəldiniz.\n${String.fromCodePoint(0x2753)} Botu necə işlətməli olduğunuzu öyrənmək istəyirsinizsə /help yazın.\n\n${String.fromCodePoint(0x00A9)} Bot @lucifer25x tərəfindən yaradılıb.\n${String.fromCodePoint(0x1F4EE)} Kanal:@lucifer25x1`
    )
})

bot.help(ctx => {
    ctx.reply(
        `${String.fromCodePoint(0x1F3AF)} Bu bot son hərfə uyğun söz tapma oyunudur. Botu aşağıda yazılan şəkildə işlədə bilərsiniz:\n\n${String.fromCodePoint(0x0031)}${String.fromCodePoint(0xFE0F)}${String.fromCodePoint(0x20E3)}. /start - Botu başlatmaq üçün\n${String.fromCodePoint(0x0032)}${String.fromCodePoint(0xFE0F)}${String.fromCodePoint(0x20E3)}. /help - Botu necə işlətməli olduğunuzu öyrənmək üçün\n${String.fromCodePoint(0x0032)}${String.fromCodePoint(0xFE0F)}${String.fromCodePoint(0x20E3)}. /gstart {söz} - Yazılan sözlə oyunu başlatmaq.\n${String.fromCodePoint(0x0033)}${String.fromCodePoint(0xFE0F)}${String.fromCodePoint(0x20E3)}. /gstop - Oyunu bitirmək üçün\n\n${String.fromCodePoint(0x2705)} Botda oyun başlatdıqdan sonra istəyən insan onun son hərfi ilə söz yaza bilər. Digər insan isə son sözün son hərfiylə söz yazmalıdır. Səhv söz yazıldıqda oyun bitir.`
    )
})

bot.command("gstart", ctx => {
    if (ctx.chat.type == "private") {
        bot.telegram.sendMessage(
            ctx.chat.id,
            `${String.fromCodePoint(0x26D4)} Bu bot qrupda oynamaq üçün düzəldilib. Botu işlətmək üçün qrupa əlavə edib admin edin.`
        )
    } else {
        player = ctx.update.message.from.username;
        isPlaying = true;
        const message = ctx.update.message.text;
        const soz = message.slice(8, 100);
        const last = message.charAt(message.length - 1).toLowerCase();
        if (soz == "") {
            bot.telegram.sendMessage(
                ctx.chat.id,
                `${String.fromCodePoint(0x26A0)} Zəhmət olmasa /gstart komandasından sonra söz daxil edin.`
            )
        } else {
            bot.telegram.sendMessage(
                ctx.chat.id,
                `${String.fromCodePoint(0x1F587)} Oyun başladı.\n${String.fromCodePoint(0x1F4CC)} Söz tapılmalı olan hərf: ${last}`
            )
            herf = last;
        }
    }
})

bot.command("gstop", ctx => {
    herf = '';
    player = '';

    if (isPlaying) {
        ctx.reply(`${String.fromCodePoint(0x2714)} Oyun bitdi.`)
        isPlaying = false;
    } else {
        ctx.reply(`${String.fromCodePoint(0x2714)} Oyun onsuz da bitib.`)
    }
})

bot.on("text", ctx => {
    if (herf == "") {

    } else {
        if (player == ctx.update.message.from.username) {
            bot.telegram.sendMessage(
                ctx.chat.id,
                `${String.fromCodePoint(0x26A0)} ${ctx.update.message.from.first_name} öz növbənizi gözləyin.`
            )
            isPlaying=true
        } else {
            const msg = ctx.update.message.text.charAt(0).toLowerCase();
            const message = ctx.update.message.text;
            const last = message.slice(-1);
            player = ctx.update.message.from.username;
            switch (msg) {
                case herf:
                    if (last == "ı" || last == "ğ") {
                        herf = '';
                        isPlaying = false;
                        bot.telegram.sendMessage(
                            ctx.chat.id,
                            `${String.fromCodePoint(0x1F4AB)} ${ctx.update.message.from.first_name} sonu "${last}" hərfi ilə bitən söz yazaraq qalib oldu.`
                        )
                    } else {
                        bot.telegram.sendMessage(
                            ctx.chat.id,
                            `${String.fromCodePoint(0x1F4AB)} ${ctx.update.message.from.first_name} doğru yazdınız.\n${String.fromCodePoint(0x1F4CC)} Söz tapılmalı olan hərf: ${last}`
                        )
                        herf = last;
                    }
                    break;
                default:
                    bot.telegram.sendMessage(
                        ctx.chat.id,
                        `${String.fromCodePoint(0x1F4A2)} ${ctx.update.message.from.first_name} yanlış yazdınız və məğlub oldunuz. Başdan başlayın.`
                    )
                    herf = '';
                    isPlaying = false;
                    break;
            }
        }
    }
})

bot.launch();
