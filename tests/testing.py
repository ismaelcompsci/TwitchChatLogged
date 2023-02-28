import requests
import re

from src.api.constants import *


def channel():
    r = requests.get("http://127.0.0.1:8000/channel/xqc")
    print(r)
    print(r.json())


def channel_date():
    r = requests.get("http://127.0.0.1:8000/channel/xqc/2023/2/12")
    print(r)
    print(r.json())


def channel_user():
    r = requests.get("http://127.0.0.1:8000/channel/xqc/username/leeqox")
    print(r)
    print(r.json())


def match_tik(url):
    q = re.compile(TIKTOK_REGEX, url)
    print(q)


links = [
    "https://m.tiktok.com/h5/share/usr/6641141594707361797.html",
    "https://m.tiktok.com/v/6749869095467945218.html",
    "https://www.tiktok.com/embed/6567659045795758085",
    "https://www.tiktok.com/share/user/6567659045795758085",
    "https://www.tiktok.com/trending?shareId=6744531482393545985",
]

for link in links:
    match_tik(link)
