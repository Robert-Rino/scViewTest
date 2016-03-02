import csv

chapter_list = []
chapter_obj = {}
with open('chapter-728.csv','r') as f:
    reader = csv.reader(f)
    for line in reader:
        if int(line[2]) not in chapter_list:
            chapter_list.append(int(line[2]))
            chapter_order = chapter_list.index(int(line[2]))
            chapter_obj[int(line[1])] = chapter_order
        else:
            chapter_order = chapter_list.index(int(line[2]))
            chapter_obj[int(line[1])] = chapter_order
    print chapter_obj

with open('chapter-728-done.txt','w') as f:
    f.write(str(chapter_obj))
