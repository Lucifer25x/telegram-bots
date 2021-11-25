
const { Telegraf } = require('telegraf');
const bot = new Telegraf('');

const riyaziyyat = require('./api/riyaziyyat.json');
const ingilis = require('./api/ingilis.json');


var sira = 0;
var dogru = 0;
var yanlis = 0;
var sualSayi;
var isPlaying = false;
var cavablanmamis = 0;

var messageId;

bot.start(ctx=>{
    bot.telegram.sendMessage(
        ctx.chat.id,
        "💎 Milyonçu botuna xoş gəlmisiniz.\n\n© Bot @lucifer25x tərəfindən əyləncə məqsədi ilə düzəldilib.",
        {
            reply_markup: {
                inline_keyboard: [
                    [{text: "Github", url: "https://github.com/Lucifer25x"},{text: "Telegram", url: "https://t.me/lucifer25x1"}],
                    [{text:"Oyuna başla",callback_data: "start"}]
                ]
            }
        }
    )
})

bot.action("start",ctx=>{
    bot.telegram.sendMessage(
        ctx.chat.id,
        "❔ Hansı kateqoriyada suallara cavab vermək istəyirsiniz?",
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Riyaziyyat", callback_data: "riyaziyyat" }],
                    [{ text: "İngilis dili", callback_data: "ingilis" }],
                    [{ text: "Azərbaycan-dili", callback_data: "yox" }],
                    [{ text: "Coğrafiya", callback_data: "yox" }],
                    [{ text: "Fizika", callback_data: "yox" }]
                ]
            }
        }
    )
})

bot.action("yox",ctx=>{
    bot.telegram.sendMessage(
        ctx.chat.id,
        "💡 Bu kateqoriya hələ əlavə edilməyib. Lakin tezliklə əlavə edilməsi düşünülür.\n\nƏgər yardım etmək istəyirsinizsə @lucifer25x hesabına yazın.",
        {
            reply_markup: {
                inline_keyboard: [
                    [{text: "Başqa kateqoriya seç", callback_data: "start"}]
                ]
            }
        }
    )
})

/* Riyaziyyat kateqoriyasi baslangic */
bot.action("riyaziyyat",ctx=>{
    bot.telegram.sendMessage(
        ctx.chat.id,
        "✔ Riyaziyyatı seçdiniz.",
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Başla", callback_data:"rstart" }]
                ]
            }
        }
    )
})

bot.action("rstart",ctx=>{
    messageId = ctx.update.callback_query.message.message_id;
    isPlaying = true;
    sualSayi = riyaziyyat.length;
    bot.telegram.sendMessage(
        ctx.chat.id,
        riyaziyyat[sira].sual,
        {
            reply_markup: {
                inline_keyboard: [
                    [{text: riyaziyyat[sira].a, callback_data: 'ra'}],
                    [{text: riyaziyyat[sira].b, callback_data: 'rb'}],
                    [{text: riyaziyyat[sira].c, callback_data: 'rc'}],
                    [{text: "Bilmirəm.", callback_data: 'rbilmirem'}]
                ]
            }
        }
    )
})


bot.action("rbilmirem",ctx=>{
    if (isPlaying) {
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

bot.action("ra",ctx=>{
    if(isPlaying){
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
    } else {
        bot.telegram.sendMessage(
            ctx.chat.id,
            "‼ Oyun hələ başladılmayıb.",
            {
                reply_markup: {
                    inline_keyboard: [
                        [{text: "Oyunu başlat", callback_data: "start"}]
                    ]
                }
            }
        )
    }
})

bot.action("rb", ctx => {
    if(isPlaying){
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
    if(isPlaying){
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

bot.action("rnext",ctx=>{
    if(isPlaying){
        bot.telegram.deleteMessage(ctx.chat.id, messageId)
        if (sira < sualSayi-1){
            sira++
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
            messageId = ctx.update.callback_query.message.message_id;
        } else {
            cavablanmamis = sualSayi - (dogru+yanlis);
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
            messageId='';
            caterogySecim = '';
            sira = 0;
            sualSayi = 0;
            dogru = 0;
            yanlis = 0;
            isPlaying=false;
            cavablanmamis=0;
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



/* İngilis dili baslangic */
bot.action("ingilis", ctx => {
    bot.telegram.sendMessage(
        ctx.chat.id,
        "✔ Ingilis dilini seçdiniz.",
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Başla", callback_data: "enstart" }]
                ]
            }
        }
    )
})

bot.action("enstart", ctx => {
    messageId = ctx.update.callback_query.message.message_id;
    isPlaying = true;
    sualSayi = ingilis.length;
    bot.telegram.sendMessage(
        ctx.chat.id,
        ingilis[sira].sual,
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: ingilis[sira].a, callback_data: 'ea' }],
                    [{ text: ingilis[sira].b, callback_data: 'eb' }],
                    [{ text: ingilis[sira].c, callback_data: 'ec' }],
                    [{ text: "Bilmirəm.", callback_data: 'ebilmirem' }]
                ]
            }
        }
    )
})

bot.action("ebilmirem", ctx => {
    if (isPlaying) {
        bot.telegram.sendMessage(
            ctx.chat.id,
            `❓ Sualın cavabını bilmirsiniz. Doğru cavab '${ingilis[sira].cavab}' variantında idi.`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "Növbəti suala keç", callback_data: "enext" }],
                        [{ text: "Oyunu bitir.", callback_data: "stop" }]
                    ]
                }
            }
        )
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

bot.action("ea", ctx => {
    if (isPlaying) {
        if (ingilis[sira].cavab == "a") {
            dogru++
            bot.telegram.sendMessage(
                ctx.chat.id,
                "☑ Doğru cavab verdiniz.",
                {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "Növbəti suala keç", callback_data: "enext" }],
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
                            [{ text: "Növbəti suala keç", callback_data: "enext" }],
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

bot.action("eb", ctx => {
    if (isPlaying) {
        if (ingilis[sira].cavab == "b") {
            dogru++
            bot.telegram.sendMessage(
                ctx.chat.id,
                "☑ Doğru cavab verdiniz.",
                {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "Növbəti suala keç", callback_data: "enext" }],
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
                            [{ text: "Növbəti suala keç", callback_data: "enext" }],
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

bot.action("ec", ctx => {
    if (isPlaying) {
        if (ingilis[sira].cavab == "c") {
            dogru++
            bot.telegram.sendMessage(
                ctx.chat.id,
                "☑ Doğru cavab verdiniz.",
                {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "Növbəti suala keç", callback_data: "enext" }],
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
                            [{ text: "Növbəti suala keç", callback_data: "enext" }],
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

bot.action("enext", ctx => {
    if (isPlaying) {
        bot.telegram.deleteMessage(ctx.chat.id, messageId)
        if (sira < sualSayi - 1) {
            sira++
            bot.telegram.sendMessage(
                ctx.chat.id,
                ingilis[sira].sual,
                {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: ingilis[sira].a, callback_data: 'ea' }],
                            [{ text: ingilis[sira].b, callback_data: 'eb' }],
                            [{ text: ingilis[sira].c, callback_data: 'ec' }],
                            [{ text: "Bilmirəm.", callback_data: 'ebilmirem' }]
                        ]
                    }
                }
            )
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
/* Ingilis dili son */



bot.action("stop",ctx=>{
    if(isPlaying){
        var cavablanmamis = sualSayi - (dogru+yanlis);
        bot.telegram.sendMessage(
            ctx.chat.id,
            "Oyun bitdi.",
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: `➡ Ümumi sual: ${sualSayi}`, callback_data: 'bos' }],
                        [{ text: `☑ Doğru cavab: ${dogru}` , callback_data: 'bos' }],
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
        cavablanmamis=0;
        messageId='';
    } else {
        bot.telegram.sendMessage(
            ctx.chat.id,
            "Oyun onsuz da bitib.",
            {
                reply_markup:{
                    inline_keyboard:[
                        [{text: "Oyunu başlat", callback_data: "start"}]
                    ]
                }
            }
        )
    }
})

bot.launch()
