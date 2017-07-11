from glob import glob
import json

print("UQ-SECAT indexer\n"
      "-----------------")
print("Indexing the api folder")

# Creates a courses.json file which is a list of all the courses and
folder = 'api/'
filename = 'api/courses.json'

blob = glob("api/*/*/*.json")
courses = {}

for path in sorted(blob):
    course_details = path.split("/")
    code = course_details[1]
    year = course_details[2]
    sem = course_details[3][0]

    if courses.get(code) is None:
        courses[code] = {}
    if courses[code].get(year) is None:
        courses[code][year] = []
    courses[code][year].append(sem)

f = open(filename, 'w')
f.write(json.dumps(courses, default=lambda x: x.__dict__))
f.close()