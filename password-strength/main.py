from dotenv import load_dotenv
import logging
from aiogram import Bot, Dispatcher, executor, types
import os
import string

load_dotenv()

API_TOKEN=os.getenv('TOKEN')

logging.basicConfig(level=logging.INFO)

bot = Bot(token=API_TOKEN)
dp = Dispatcher(bot)

@dp.message_handler(commands=['start'])
async def start(message: types.Message):
    await message.reply("Hi! I'm a bot that can help you to check your password strength.\n\nFor usage, type /help")

@dp.message_handler(commands=['help'])
async def help(message: types.Message):
    await message.reply("For checking password strength, type /check <password>")

@dp.message_handler(commands=['check'])
async def check(message: types.Message):
    password = message.get_args()
    if password:
        upper_case = any([1 if c in string.ascii_uppercase else 0 for c in password])
        lower_case = any([1 if c in string.ascii_lowercase else 0 for c in password])
        special = any([1 if c in string.punctuation else 0 for c in password])
        numbers = any([1 if c in string.digits else 0 for c in password])

        characters = [upper_case, lower_case, special, numbers]
        length = len(password)
        score = 0

        with open('common.txt', 'r') as f:
            common = f.read().splitlines()

        if password in common:
            await message.reply("Your password is too common. Please choose another one.")
        else:
            if length > 8:
                score += 1
            if length > 12:
                score += 1
            if length > 17:
                score += 1
            if length > 20:
                score += 1
            await message.reply(f"Password length is {str(length)}, adding {str(score)} points!")

            if sum(characters) > 1:
                score += 1
            if sum(characters) > 2:
                score += 1
            if sum(characters) > 3:
                score += 1
            await message.reply(f"Password has {str(sum(characters))} different characters types, adding {str(sum(characters) - 1)}")

            if score < 4:
                await message.reply(f"The password is quite weak! Score: {str(score)} / 7")
            elif score == 4:
                await message.reply(f"The password is ok! Score: {str(score)} / 7")
            elif score > 4 and score < 6:
                await message.reply(f"The password is pretty good! Score {str(score)} / 7")
            elif score > 6:
                await message.reply(f"The password is strong! Score: {str(score)} / 7")
    else:
        await message.reply("Please type a password!")

if __name__ == '__main__':
    executor.start_polling(dp, skip_updates=True)        
