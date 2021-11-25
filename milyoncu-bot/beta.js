const { Telegraf } = require('telegraf');
const bot = new Telegraf('');

const riyaziyyat = require('./api/riyaziyyat.json');
const ingilis = require('./api/ingilis.json');


var caterogySecim;
var sira = 0;
var dogru = 0;
var yanlis = 0;
var sualSayi;
var isPlaying = false;
var cavablanmamis = 0;

var categories = [
    "riyaziyyat",
    "ingilis",
    "az",
    "cografiya",
    "fizika"
]

var messageId;

bot.start(ctx => {
    bot.telegram.sendMessage(
        ctx.chat.id,
        "💎 Milyonçu botuna xoş gəlmisiniz.\n\n© Bot @lucifer25x tərəfindən əyləncə məqsədi ilə düzəldilib.",
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Github", url: "https://github.com/Lucifer25x" }, { text: "Telegram", url: "https://t.me/lucifer25x1" }],
                    [{ text: "Oyuna başla", callback_data: "start" }]
                ]
            }
        }
    )
})

bot.action("start", ctx => {
    bot.telegram.sendMessage(
        ctx.chat.id,
        "❔ Hansı kateqoriyada suallara cavab vermək istəyirsiniz?",
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Riyaziyyat", callback_data: categories[0] }],
                    [{ text: "İngilis dili", callback_data: categories[1] }],
                    [{ text: "Azərbaycan-dili", callback_data: categories[2] }],
                    [{ text: "Coğrafiya", callback_data: categories[3] }],
                    [{ text: "Fizika", callback_data: categories[4] }]
                ]
            }
        }
    )
})

/* Riyaziyyat kateqoriyasi baslangic */
bot.action(categories[0], ctx => {
    caterogySecim = categories[0];
    bot.telegram.sendMessage(
        ctx.chat.id,
        "✔ Riyaziyyatı seçdiniz.",
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Başla", callback_data: "rstart" }]
                ]
            }
        }
    )
})

bot.action(categories[1], ctx => {
    caterogySecim = categories[1]
    bot.telegram.sendMessage(
        ctx.chat.id,
        "✔ Ingilis dilini seçdiniz.",
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Başla", callback_data: "rstart" }]
                ]
            }
        }
    )
})

bot.action(categories[2], ctx => {
    caterogySecim = categories[2]
    bot.telegram.sendMessage(
        ctx.chat.id,
        "✔ Azərbaycan dilini seçdiniz.",
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Başla", callback_data: "rstart" }]
                ]
            }
        }
    )
})


bot.action(categories[3], ctx => {
    caterogySecim = categories[3]
    bot.telegram.sendMessage(
        ctx.chat.id,
        "✔ Coğrafiyanı seçdiniz.",
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Başla", callback_data: "rstart" }]
                ]
            }
        }
    )
})

bot.action(categories[4], ctx => {
    caterogySecim = categories[4]
    bot.telegram.sendMessage(
        ctx.chat.id,
        "✔ Fizikanı seçdiniz.",
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Başla", callback_data: "rstart" }]
                ]
            }
        }
    )
})

bot.action("rstart", ctx => {
    messageId = ctx.update.callback_query.message.message_id;
    isPlaying = true;
    if(caterogySecim==categories[0]){
        sualSayi = riyaziyyat.length;
        bot.telegram.sendMessage(
            ctx.chat.id,
            riyaziyyat[sira].sual,
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: riyaziyyat[sira].a, callback_data: 'ra' }],
                        [{ text: riyaziyyat[sira].b, callback_data: 'rb' }],
                        [{ text: riyaziyyat[sira].c, callback_data: 'rc' }],
                        [{ text: "Bilmirəm.", callback_data: 'rbilmirem' }]
                    ]
                }
            }
        )
    } else if (caterogySecim == categories[1]){
        sualSayi = ingilis.length;
        bot.telegram.sendMessage(
            ctx.chat.id,
            ingilis[sira].sual,
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: ingilis[sira].a, callback_data: 'ra' }],
                        [{ text: ingilis[sira].b, callback_data: 'rb' }],
                        [{ text: ingilis[sira].c, callback_data: 'rc' }],
                        [{ text: "Bilmirəm.", callback_data: 'rbilmirem' }]
                    ]
                }
            }
        )
    } else {
        bot.telegram.sendMessage(
            ctx.chat.id,
            "💡 Bu kateqoriya sualları hələ əlavə edilməyib. Lakin tezliklə əlavə edilməsi düşünülür.\n\nƏgər yardım etmək istəyirsinizsə @lucifer25x hesabına yazın.",
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "Başqa kateqoriya seç", callback_data: "start" }]
                    ]
                }
            }
        )
    }
})


bot.action("rbilmirem", ctx => {
    if (isPlaying) {
        if(caterogySecim==categories[0]){
            bot.telegram.sendMessage(
                ctx.chat.id,
                `❓ Sualın cavabını bilmirsiniz. Doğru cavab '${riyaziyyat[sira].cavab}' variantında idi.`,
                {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "Növbəti suala keç", callback_data: "rnext" }],
                            [{ text: "Oyunu bitir.", callback_data: "stop" }]
                        ]
                    }
                }
            )
        } else if(caterogySecim==categories[1]){
            bot.telegram.sendMessage(
                ctx.chat.id,
                `❓ Sualın cavabını bilmirsiniz. Doğru cavab '${ingilis[sira].cavab}' variantında idi.`,
                {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "Növbəti suala keç", callback_data: "rnext" }],
                            [{ text: "Oyunu bitir.", callback_data: "stop" }]
                        ]
                    }
                }
            )
        }
    } else {
        bot.telegram.sendMessage(
            ctx.chat.id,
            "‼ Oyun hələ başladılmayıb.",
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "Oyunu başlat", callback_data: "start" }]
                    ]
                }
            }
        )
    }
})

bot.action("ra", ctx => {
    if (isPlaying) {
        if(caterogySecim==categories[0]){
            if (riyaziyyat[sira].cavab == "a") {
                dogru++
                bot.telegram.sendMessage(
                    ctx.chat.id,
                    "☑ Doğru cavab verdiniz.",
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: "Növbəti suala keç", callback_data: "rnext" }],
                                [{ text: "Oyunu bitir.", callback_data: "stop" }]
                            ]
                        }
                    }
                )
            } else {
                yanlis++
                bot.telegram.sendMessage(
                    ctx.chat.id,
                    `✖ Yanlış cavab verdiniz. Doğru cavab '${riyaziyyat[sira].cavab}' variantında idi.`,
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: "Növbəti suala keç", callback_data: "rnext" }],
                                [{ text: "Oyunu bitir.", callback_data: "stop" }]
                            ]
                        }
                    }
                )
            }
        } else if(caterogySecim==categories[1]){
            if (ingilis[sira].cavab == "a") {
                dogru++
                bot.telegram.sendMessage(
                    ctx.chat.id,
                    "☑ Doğru cavab verdiniz.",
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: "Növbəti suala keç", callback_data: "rnext" }],
                                [{ text: "Oyunu bitir.", callback_data: "stop" }]
                            ]
                        }
                    }
                )
            } else {
                yanlis++
                bot.telegram.sendMessage(
                    ctx.chat.id,
                    `✖ Yanlış cavab verdiniz. Doğru cavab '${ingilis[sira].cavab}' variantında idi.`,
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: "Növbəti suala keç", callback_data: "rnext" }],
                                [{ text: "Oyunu bitir.", callback_data: "stop" }]
                            ]
                        }
                    }
                )
            }
        }
    } else {
        bot.telegram.sendMessage(
            ctx.chat.id,
            "‼ Oyun hələ başladılmayıb.",
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "Oyunu başlat", callback_data: "start" }]
                    ]
                }
            }
        )
    }
})

bot.action("rb", ctx => {
    if (isPlaying) {
        if (caterogySecim == categories[0]) {
            if (riyaziyyat[sira].cavab == "b") {
                dogru++
                bot.telegram.sendMessage(
                    ctx.chat.id,
                    "☑ Doğru cavab verdiniz.",
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: "Növbəti suala keç", callback_data: "rnext" }],
                                [{ text: "Oyunu bitir.", callback_data: "stop" }]
                            ]
                        }
                    }
                )
            } else {
                yanlis++
                bot.telegram.sendMessage(
                    ctx.chat.id,
                    `✖ Yanlış cavab verdiniz. Doğru cavab '${riyaziyyat[sira].cavab}' variantında idi.`,
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: "Növbəti suala keç", callback_data: "rnext" }],
                                [{ text: "Oyunu bitir.", callback_data: "stop" }]
                            ]
                        }
                    }
                )
            }
        } else if (caterogySecim == categories[1]) {
            if (ingilis[sira].cavab == "b") {
                dogru++
                bot.telegram.sendMessage(
                    ctx.chat.id,
                    "☑ Doğru cavab verdiniz.",
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: "Növbəti suala keç", callback_data: "rnext" }],
                                [{ text: "Oyunu bitir.", callback_data: "stop" }]
                            ]
                        }
                    }
                )
            } else {
                yanlis++
                bot.telegram.sendMessage(
                    ctx.chat.id,
                    `✖ Yanlış cavab verdiniz. Doğru cavab '${ingilis[sira].cavab}' variantında idi.`,
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: "Növbəti suala keç", callback_data: "rnext" }],
                                [{ text: "Oyunu bitir.", callback_data: "stop" }]
                            ]
                        }
                    }
                )
            }
        }
    } else {
        bot.telegram.sendMessage(
            ctx.chat.id,
            "‼ Oyun hələ başladılmayıb.",
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "Oyunu başlat", callback_data: "start" }]
                    ]
                }
            }
        )
    }
})

bot.action("rc", ctx => {
    if (isPlaying) {
        if (caterogySecim == categories[0]) {
            if (riyaziyyat[sira].cavab == "c") {
                dogru++
                bot.telegram.sendMessage(
                    ctx.chat.id,
                    "☑ Doğru cavab verdiniz.",
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: "Növbəti suala keç", callback_data: "rnext" }],
                                [{ text: "Oyunu bitir.", callback_data: "stop" }]
                            ]
                        }
                    }
                )
            } else {
                yanlis++
                bot.telegram.sendMessage(
                    ctx.chat.id,
                    `✖ Yanlış cavab verdiniz. Doğru cavab '${riyaziyyat[sira].cavab}' variantında idi.`,
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: "Növbəti suala keç", callback_data: "rnext" }],
                                [{ text: "Oyunu bitir.", callback_data: "stop" }]
                            ]
                        }
                    }
                )
            }
        } else if (caterogySecim == categories[1]) {
            if (ingilis[sira].cavab == "c") {
                dogru++
                bot.telegram.sendMessage(
                    ctx.chat.id,
                    "☑ Doğru cavab verdiniz.",
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: "Növbəti suala keç", callback_data: "rnext" }],
                                [{ text: "Oyunu bitir.", callback_data: "stop" }]
                            ]
                        }
                    }
                )
            } else {
                yanlis++
                bot.telegram.sendMessage(
                    ctx.chat.id,
                    `✖ Yanlış cavab verdiniz. Doğru cavab '${ingilis[sira].cavab}' variantında idi.`,
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: "Növbəti suala keç", callback_data: "rnext" }],
                                [{ text: "Oyunu bitir.", callback_data: "stop" }]
                            ]
                        }
                    }
                )
            }
        }
    } else {
        bot.telegram.sendMessage(
            ctx.chat.id,
            "‼ Oyun hələ başladılmayıb.",
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "Oyunu başlat", callback_data: "start" }]
                    ]
                }
            }
        )
    }
})

bot.action("rnext", ctx => {
    if (isPlaying) {
        bot.telegram.deleteMessage(ctx.chat.id, messageId)
        if (sira < sualSayi - 1) {
            sira++
            if(caterogySecim==categories[0]){
                bot.telegram.sendMessage(
                    ctx.chat.id,
                    riyaziyyat[sira].sual,
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: riyaziyyat[sira].a, callback_data: 'ra' }],
                                [{ text: riyaziyyat[sira].b, callback_data: 'rb' }],
                                [{ text: riyaziyyat[sira].c, callback_data: 'rc' }],
                                [{ text: "Bilmirəm.", callback_data: 'rbilmirem' }]
                            ]
                        }
                    }
                )
            } else if(caterogySecim==categories[1]){
                bot.telegram.sendMessage(
                    ctx.chat.id,
                    ingilis[sira].sual,
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: ingilis[sira].a, callback_data: 'ra' }],
                                [{ text: ingilis[sira].b, callback_data: 'rb' }],
                                [{ text: ingilis[sira].c, callback_data: 'rc' }],
                                [{ text: "Bilmirəm.", callback_data: 'rbilmirem' }]
                            ]
                        }
                    }
                )
            }
            messageId = ctx.update.callback_query.message.message_id;
        } else {
            cavablanmamis = sualSayi - (dogru + yanlis);
            bot.telegram.sendMessage(
                ctx.chat.id,
                "✔ Suallar bitdi.",
                {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: `➡ Ümumi sual: ${sualSayi}`, callback_data: 'bos' }],
                            [{ text: `☑ Doğru cavab: ${dogru}`, callback_data: 'bos' }],
                            [{ text: `✖ Yanlış cavab: ${yanlis}`, callback_data: 'bos' }],
                            [{ text: `❔ Cavablanmamış sual: ${cavablanmamis}`, callback_data: 'bos' }]
                        ]
                    }
                }
            )
            messageId = '';
            caterogySecim = '';
            sira = 0;
            sualSayi = 0;
            dogru = 0;
            yanlis = 0;
            isPlaying = false;
            cavablanmamis = 0;
        }
    } else {
        bot.telegram.sendMessage(
            ctx.chat.id,
            "❗ Oyun hələ başladılmayıb.",
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "Oyunu başlat", callback_data: "start" }]
                    ]
                }
            }
        )
    }
})

/* Riyaziyyat kateqoriyasi sonu */



bot.action("stop", ctx => {
    if (isPlaying) {
        var cavablanmamis = sualSayi - (dogru + yanlis);
        bot.telegram.sendMessage(
            ctx.chat.id,
            "Oyun bitdi.",
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: `➡ Ümumi sual: ${sualSayi}`, callback_data: 'bos' }],
                        [{ text: `☑ Doğru cavab: ${dogru}`, callback_data: 'bos' }],
                        [{ text: `✖ Yanlış cavab: ${yanlis}`, callback_data: 'bos' }],
                        [{ text: `❔ Cavablanmamış sual: ${cavablanmamis}`, callback_data: 'bos' }]
                    ]
                }
            }
        )
        caterogySecim = '';
        sira = 0;
        sualSayi = 0;
        dogru = 0;
        yanlis = 0;
        isPlaying = false;
        cavablanmamis = 0;
        messageId = '';
    } else {
        bot.telegram.sendMessage(
            ctx.chat.id,
            "Oyun onsuz da bitib.",
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "Oyunu başlat", callback_data: "start" }]
                    ]
                }
            }
        )
    }
})

bot.launch()
