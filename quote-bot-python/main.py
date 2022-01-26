import logging
from dotenv import load_dotenv
import os
import json
from random import randint
from aiogram import Bot, Dispatcher, executor, types

kitab_json = json.load(open('api/books.json'))
aforizm_json = json.load(open('api/aforizm.json'))
quote_json = json.load(open('api/quote.json'))

load_dotenv()

API_TOKEN = os.getenv('API_TOKEN')

logging.basicConfig(level=logging.INFO)

bot = Bot(token=API_TOKEN)
dp = Dispatcher(bot)

@dp.message_handler(commands=['start'])
async def send_welcome(message: types.Message):
    await message.reply('"Random Quote" botuna xoş gəldin.\nBotu necə işlətməli olduğunu öyrənmək üçün /help yaz.')

@dp.message_handler(commands=['help'])
async def send_help(message: types.Message):
    await message.reply('Kömək bölümünə xoş gəldiniz. Bu bot sizə random alıntılar, bilgilər demək və kitablar önərmək üçün yaradılıb.\n\nKitablar üçün - /kitab\nAlıntılar üçün - /alinti\nAforizmlər üçün - /aforizm\n\nTəklif və tövsiyyələriniz üçün @lucifer25x yaza bilərsiniz.\nBot @lucifer25x tərəfindən yaradılıb.')

@dp.message_handler(commands=['kitab'])
async def send_book(message: types.Message):
    rand = randint(0, len(kitab_json) - 1)
    await message.reply(f'Kitab: {kitab_json[rand]["book"]}\n\nYazıçı: {kitab_json[rand]["writer"]}')

@dp.message_handler(commands=['alinti'])
async def send_alinti(message: types.Message):
    rand = randint(0, len(quote_json) -1)
    await message.reply(f'Alıntı: {quote_json[rand]["quote"]}\n\nKitab: {quote_json[rand]["book"]}')

@dp.message_handler(commands=['aforizm'])
async def send_aforizm(message: types.Message):
    rand = randint(0, len(aforizm_json) - 1)
    await message.reply(f'Aforizm: {aforizm_json[rand]["quote"]}\n\nTərcümə: {aforizm_json[rand]["tercume"]}\n\nImza: {aforizm_json[rand]["author"]}')

if __name__ == '__main__':
    executor.start_polling(dp, skip_updates=True)
