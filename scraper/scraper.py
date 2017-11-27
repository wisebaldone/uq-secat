from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import time
import json
import os

from course_description import CourseDescription

print("UQ-SECAT Scraper\n"
      "-----------------")
print("Please Do not Run this aggressively\n")
print("Loading WebBrowser...")

driver = webdriver.Chrome('./chromedriver')
driver.get("http://www.pbi.uq.edu.au/clientservices/SECaT/embedChart.aspx")
WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "RadTabStrip1")))

print("Preparing to fetch data.")
driver.maximize_window()
time.sleep(1)

top_level = driver.find_element_by_class_name("rtsLevel1")
elements = top_level.find_elements_by_class_name("rtsLink")

level1_num = len(elements)

for level1 in range(0, level1_num):
    level1_bar = driver.find_element_by_class_name("rtsLevel1")
    level1_elements = level1_bar.find_elements_by_class_name("rtsLink")
    level1_elements[level1].click()

    lowest_counter = 0

    level2_bar = driver.find_element_by_class_name("rtsLevel2")
    level2_elements = level2_bar.find_elements_by_class_name("rtsLink")
    level2_num = len(level2_elements)
    for level2 in range(0, level2_num):
        level2_bar = driver.find_element_by_class_name("rtsLevel2")
        level2_elements = level2_bar.find_elements_by_class_name("rtsLink")
        level2_elements[level2].click()

        level3_bar = driver.find_element_by_class_name("rtsLevel3").find_elements_by_class_name("rtsUL")[level2]
        level3_elements = level3_bar.find_elements_by_class_name("rtsLink")
        level3_num = len(level3_elements)
        for level3 in range(0, level3_num):
            level3_bar = driver.find_element_by_class_name("rtsLevel3").find_elements_by_class_name("rtsUL")[level2]
            level3_elements = level3_bar.find_elements_by_class_name("rtsLink")
            level3_elements[level3].click()

            level4_bar = driver.find_element_by_class_name("rtsLevel4").find_elements_by_class_name("rtsUL")[lowest_counter]
            level4_elements = level4_bar.find_elements_by_class_name("rtsLink")
            level4_num = len(level4_elements)
            for level4 in range(0, level4_num):
                level4_bar = driver.find_element_by_class_name("rtsLevel4").find_elements_by_class_name("rtsUL")[lowest_counter]
                level4_elements = level4_bar.find_elements_by_class_name("rtsLink")
                level4_elements[level4].click()


                # Get Stats
                raw = driver.execute_script("return courseSECATData;")
                description = driver.execute_script("return title;")
                enrolled = driver.find_element_by_id("lblNoEnrolled").text
                responses = driver.find_element_by_id("lblNoResponses").text
                rate = driver.find_element_by_id("lblRespRate").text
                #try:

                course = CourseDescription(raw, description, enrolled, responses, rate)
                #except:
                #    print(description)
                #    continue
                filename = "api/{}/{}/{}.json".format(course.course, course.year, course.semester)
                try:
                    os.makedirs(os.path.dirname(filename))
                except:
                    #do nothing
                    pass

                f = open(filename, 'w')
                f.write(json.dumps(course, default=lambda x: x.__dict__))
                f.close()

            lowest_counter += 1
    # INTERNET'S DODGY SO LETS DO A LETTER AT A TIME
    #break
time.sleep(5)
print("Closing Web Browser")
driver.close()
