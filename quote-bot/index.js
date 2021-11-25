const { Telegraf } = require('telegraf');
/* Burada apidən aforizm, kitab, alıntı məlumatı çəkilir */
const aforizm = require('./api/aforizm.json');
const kitab = require('./api/books.json');
const quote = require('./api/quote.json');

/* Burada d;rnaq içində bot tokenini yazın */
const bot = new Telegraf('');


/* Burada bot başladıldıqda botun nə edəcəyi yazılıb */
bot.start(ctx => {
    ctx.telegram.sendMessage(
        ctx.chat.id,
        `${String.fromCodePoint(0x1F48E)} "Random Quote" botuna xoş gəldin.\n\n${String.fromCodePoint(0x2753)} Botu necə işlətməli olduğunu öyrənmək üçün /help yaz.`,
        {
            reply_markup: {
                inline_keyboard: [
                    [{text: "Saytımız", url: "https://lucifer25x.ml"}, {text: "Github", url: "https://github.com/Lucifer25x"}],
                    [{ text: "Kanalımız", url: "https://t.me/lucifer25x1"}]
                ]
            }
        }
    )
});

/* .command funksiyası hansı commandda botun nə etməli olduğunu bildirmək üçündür */
bot.command('help', ctx => {
    bot.telegram.sendMessage(
        ctx.chat.id,
        `${String.fromCodePoint(0x2139)} Kömək bölümünə xoş gəldiniz. Bu bot sizə random alıntılar, bilgilər demək və kitablar önərmək üçün yaradılıb.\n\n${String.fromCodePoint(0x1F4C1)} Alıntı üçün - /alinti\n${String.fromCodePoint(0x2712)} Aforizmlər üçün - /aforizm\n${String.fromCodePoint(0x1F4DA)} Kitablar üçün - /kitab\n\nTəklif və tövsiyyələriniz üçün @lucifer25x yaza bilərsiniz.\n${String.fromCodePoint(0x00A9)} Bot @lucifer25x tərəfindən yaradılıb.`
    );
});

/*
Emoji isletmek ucun: String.fromCodePoint(0x1F4D2);
Emoji kodlari: 0x + Unicode Emoji kodu
Məsələn: ${String.fromCodePoint(0x1F4C3)}Tərcümə: ${aforizm[random].tercume}
*/

bot.command('kitab', ctx => {
    var rand = Math.floor(Math.random() * kitab.length);
    bot.telegram.sendMessage(
        ctx.chat.id,
        `${String.fromCodePoint(0x1F4D2)} Kitab: ${kitab[rand].book}\n\n${String.fromCodePoint(0x2712)} Yazıçı: ${kitab[rand].writer}`
    )
})

bot.command('alinti', ctx => {
    var randm = Math.floor(Math.random() * quote.length);
    bot.telegram.sendMessage(
        ctx.chat.id,
        `${String.fromCodePoint(0x1F4D2)} Alıntı: ${quote[randm].quote}\n\n${String.fromCodePoint(0x2712)} Kitab: ${quote[randm].book}`
    )
})

bot.command('aforizm', ctx => {
    var random = Math.floor(Math.random()*aforizm.length);
    bot.telegram.sendMessage(ctx.chat.id, 
    `
        ${String.fromCodePoint(0x1F4D2)} Aforizm: ${aforizm[random].quote}\n\n${String.fromCodePoint(0x1F4C3)}Tərcümə: ${aforizm[random].tercume}\n\n${String.fromCodePoint(0x2712)} Imza: ${aforizm[random].author}
    `    
    )
});

bot.launch();
