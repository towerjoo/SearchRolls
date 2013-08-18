#coding: utf-8
import re
from bs4 import BeautifulSoup as BS
soup = BS(open("ses.js"))

def get_num(classname):
    divs = soup.find_all("div", class_=classname)
    names = [div.text for div in divs]
    return names

classes = ["name-column", "keyword-column", "url-column"]

c1 = get_num(classes[0])
c2 = get_num(classes[1])
c3 = get_num(classes[2])

all = []
i = 0
for c in c3:
    if c in all:
        c3.pop(i)
        c2.pop(i)
        c1.pop(i)
    else:
        all.append(c)
    i += 1

for i in range(len(c1)):
    print c1[i].encode("utf-8").strip(), 
    print ",",
    print c2[i].strip(),
    print ",",
    print c3[i].encode("utf-8").strip()
