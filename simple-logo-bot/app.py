from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw

W,H= (1000,1000)
with open('name.txt') as f:
    contents = f.read()
    print(contents)
img = Image.open("bg.jpg")
draw = ImageDraw.Draw(img)
font = ImageFont.truetype("Poppins-Bold.ttf", 60)
w, h = draw.textsize(contents)
draw.text(((W-w)/2-60, (H-h)/2), contents, (255, 255, 255), font)
img.save('logo.jpg')
