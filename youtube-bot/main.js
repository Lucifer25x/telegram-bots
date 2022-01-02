// Import some important modules
const { Telegraf } = require('telegraf');
const { getVideo, search } = require('@fabricio-191/youtube')
    .setDefaultOptions({
        location: 'EN',
        language: 'EN'
    });
//const dotenv = require('dotenv').config();

// Get Token
const token = process.env.TOKEN;

// Create new Bot
const bot = new Telegraf(token);

// Some variables
let index = 6;
let srch;

// Search on Youtube
function searchOnYoutube(results, data) {
    for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].type == 'video') {
            const videoTitle = data.results[i].title;
            const videoUrl = data.results[i].URL;
            const next = [{ text: 'Next List>', callback_data: 'next' }]
            const arr = [];
            const obj = { text: videoTitle, url: videoUrl };
            arr.push(obj)

            if (results.length != 0 && results.length % 5 == 0) {
                results.push(next);
            }
            results.push(arr)
        }
    }
}

// Start Bot
bot.command('start', (ctx) => {
    bot.telegram.sendMessage(
        ctx.chat.id,
        'Welcome to YoutubeBot! For help type /help.'
    )
})

// Help Command
bot.command('help', (ctx) => {
    bot.telegram.sendMessage(
        ctx.chat.id,
        '/info {url} - About video\n/search {text} - Search video'
    )
})

// Get video info
bot.command('info', (ctx) => {
    const msg = ctx.update.message.text;
    const youtubeUrl = msg.slice(6, msg.length);

    if (youtubeUrl.slice(0, 4) == "http") {
        getVideo(youtubeUrl)
            .then(data => {
                const name = data.name;
                const likes = data.likes;
                const dislikes = data.dislikes;
                const views = data.views.normal;
                const ownerName = data.owner.name;
                const ownerChannel = data.owner.URL;
                const thumbnail = data.thumbnails[0].url;
                const uploadDate = data.uploadDate;
                bot.telegram.sendPhoto(
                    ctx.chat.id,
                    thumbnail,
                    {
                        caption: `${name}`,
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: ownerName, url: ownerChannel }],
                                [{ text: `Views: ${views}`, callback_data: 'nothing' }, { text: `Date: ${uploadDate}`, callback_data: 'nothing' }],
                                [{ text: `Likes: ${likes}`, callback_data: 'nothing' }, { text: `Dislikes: ${dislikes}`, callback_data: 'nothing' }]
                            ]
                        }
                    }
                )
            })
            .catch(console.error);
    } else {
        ctx.reply("Please send youtube video url :D");
    }
})

// Search and return results
bot.command('search', (ctx) => {
    index = 6;
    srch = '';
    const msg = ctx.update.message.text;
    const searchQuery = msg.slice(7, msg.length);
    srch = searchQuery;
    search(searchQuery, { quantity: 5 })
        .then(data => {
            const results = [];

            searchOnYoutube(results, data);

            bot.telegram.sendMessage(
                ctx.chat.id,
                `Founded ${data.estimatedResults} results.`,
                {
                    reply_markup: {
                        inline_keyboard: results.slice(index - 6, index)
                    }
                }
            )
        })
        .catch(console.error);
})

bot.action('next', (ctx) => {
    index += 5
    search(srch, { quantity: 5 })
        .then(data => {
            const results = [];

            searchOnYoutube(results, data);

            bot.telegram.sendMessage(
                ctx.chat.id,
                `Founded ${data.estimatedResults} results.`,
                {
                    reply_markup: {
                        inline_keyboard: results.slice(index - 5, index)
                    }
                }
            )
        })
        .catch(console.error);
})

// Launch Bot
bot.launch()
