const { Telegraf } = require('telegraf');
const env = require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const board = [
    { text: ' ', callback_data: 1 }, { text: ' ', callback_data: 2 }, { text: ' ', callback_data: 3 },
    { text: ' ', callback_data: 4 }, { text: ' ', callback_data: 5 }, { text: ' ', callback_data: 6 },
    { text: ' ', callback_data: 7 }, { text: ' ', callback_data: 8 }, { text: ' ', callback_data: 9 }
];
const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let turn = 'X';
let oldMessageId = null;

function checkWinner(currentBoard, currentTurn) {
    for (let i = 0; i < winCombinations.length; i++) {
        const win = winCombinations[i];
        if (currentBoard[win[0]].text === currentTurn && currentBoard[win[1]].text === currentTurn && currentBoard[win[2]].text === currentTurn) {
            return true;
        }
    }
    return false;
}

function reset() {
    for (let i = 0; i < board.length; i++) {
        board[i].text = ' ';
    }
    turn = 'X';
}
function isAnyEmpty(currentBoard) {
    for (let i = 0; i < board.length; i++) {
        if (currentBoard[i].text === ' ') {
            return true;
        }
    }
    return false;
}

bot.start(ctx => {
    ctx.reply('Welcome to Tic Tac Toe!\nFor start game, send me /gstart');
})

bot.command('gstart', async ctx => {
    reset();
    const message = await bot.telegram.sendMessage(
        ctx.from.id,
        "X's turn\nStop: /gstop",
        {
            reply_markup: {
                inline_keyboard: [
                    [board[0], board[1], board[2]],
                    [board[3], board[4], board[5]],
                    [board[6], board[7], board[8]]
                ]
            }
        }
    )
    oldMessageId = message.message_id;
})

bot.command('gstop', ctx => {
    bot.telegram.deleteMessage(ctx.from.id, oldMessageId);
    reset();
})

bot.action(/[0-9]/, async ctx => {
    const match = parseInt(ctx.match[0]);
    for (let i = 0; i < board.length; i++) {
        if (board[i].callback_data == match && board[i].text == ' ') {
            if (oldMessageId) {
                await bot.telegram.deleteMessage(ctx.from.id, oldMessageId);
            }
            board[i].text = turn;
            if (checkWinner(board, turn)) {
                ctx.reply(`${turn} win!`);
                return;
            } else {
                if(isAnyEmpty(board)){
                    if (turn == 'X') {
                        turn = 'O';
                    }
                    else {
                        turn = 'X';
                    }
                    const message = await bot.telegram.sendMessage(
                        ctx.from.id,
                        `${turn}'s turn`,
                        {
                            reply_markup: {
                                inline_keyboard: [
                                    [board[0], board[1], board[2]],
                                    [board[3], board[4], board[5]],
                                    [board[6], board[7], board[8]]
                                ]
                            }
                        }
                    );
                    oldMessageId = message.message_id;
                    break;
                } else {
                    ctx.reply('Draw!');
                    break;
                }
            }
        }
    }
});

bot.launch();
