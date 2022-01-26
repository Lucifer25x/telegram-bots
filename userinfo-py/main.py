import logging
from dotenv import load_dotenv
from os import getenv
from aiogram import Bot, Dispatcher, executor, types

load_dotenv()

logging.basicConfig(level=logging.INFO)

bot = Bot(token=getenv('TOKEN'))
dp = Dispatcher(bot)

@dp.message_handler(commands=['start'])
async def cmd_start(message: types.Message):
    username = message.from_user.username
    user_id = message.from_user.id
    first_name = message.from_user.first_name
    await message.reply(f'Etiket: @{username}\nAd: {first_name}\nID: {user_id}')

@dp.message_handler()
async def info(message: types.Message):
    username = message.from_user.username
    user_id = message.from_user.id
    first_name = message.from_user.first_name
    await message.reply(f'Etiket: @{username}\nAd: {first_name}\nID: {user_id}')

if __name__ == '__main__':
    executor.start_polling(dp, skip_updates=True)
