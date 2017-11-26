class CourseDescription(object):

    def __init__(self, raw, description, enrolled, responses, rate):
        self.course = raw[0]['COURSE_CD']
        self.description = description.split(":")[0]
        self.year = raw[0]['SEMESTER_DESCR'].split(",")[1].strip()
        self.enrolled = int(enrolled)
        self.responses = int(responses)
        self.rate = rate
        if "Summer" in raw[0]['SEMESTER_DESCR']:
            self.semester = 3
        else:
            self.semester = int(raw[0]['SEMESTER_DESCR'].split(" ")[1].split(",")[0])

        index = 0

        if index < len(raw) -1 and raw[index]['QUESTION_NAME'][1] == '1':
            self.q1 = QuestionDescription(raw[index:index+5])
            index += 5
        else:
            self.q1 = QuestionDescription()

        if index < len(raw) -1 and raw[index]['QUESTION_NAME'][1] == '2':
            self.q2 = QuestionDescription(raw[index:index+5])
            index += 5
        else:
            self.q2 = QuestionDescription()

        if index < len(raw) -1 and raw[index]['QUESTION_NAME'][1] == '3':
            self.q3 = QuestionDescription(raw[index:index+5])
            index += 5
        else:
            self.q3 = QuestionDescription()

        if index < len(raw) -1 and raw[index]['QUESTION_NAME'][1] == '4':
            self.q4 = QuestionDescription(raw[index:index+5])
            index += 5
        else:
            self.q4 = QuestionDescription()

        if index < len(raw) -1 and raw[index]['QUESTION_NAME'][1] == '5':
            self.q5 = QuestionDescription(raw[index:index+5])
            index += 5
        else:
            self.q5 = QuestionDescription()

        if index < len(raw) -1 and raw[index]['QUESTION_NAME'][1] == '6':
            self.q6 = QuestionDescription(raw[index:index+5])
            index += 5
        else:
            self.q6 = QuestionDescription()

        if index < len(raw) -1 and raw[index]['QUESTION_NAME'][1] == '7':
            self.q7 = QuestionDescription(raw[index:index+5])
            index += 5
        else:
            self.q7 = QuestionDescription()

        if index < len(raw) -1 and raw[index]['QUESTION_NAME'][1] == '8':
            self.q8 = QuestionDescription(raw[index:index+5])
            index += 5
        else:
            self.q8 = QuestionDescription()
        return

    def __str__(self):
        return str(self.__dict__)

    def __repr__(self):
        return str(self.__dict__)


class QuestionDescription(object):

    def __init__(self, raw=None):
        if raw is None:
            self.description = "Missing"
            self.strong_agree = {'value': 0, 'total': 0,'percent': 0.00}
            self.agree = {'value': 0, 'total': 0,'percent': 0.00}
            self.neutral = {'value': 0, 'total': 0,'percent': 0.00}
            self.disagree = {'value': 0, 'total': 0,'percent': 0.00}
            self.strong_disagree = {'value': 0, 'total': 0,'percent': 0.00}
        else:
            self.description = raw[0]['QUESTION_NAME'].split(":")[1].strip()
            self.strong_agree = {'value': raw[0]['VALUE'], 'total': raw[0]['ANSWERED_QUESTION'], 'percent': round(raw[0]['PERCENT_ANSWER'], 2)}
            self.agree = {'value': raw[1]['VALUE'], 'total': raw[1]['ANSWERED_QUESTION'], 'percent': round(raw[1]['PERCENT_ANSWER'], 2)}
            self.neutral = {'value': raw[2]['VALUE'], 'total': raw[2]['ANSWERED_QUESTION'], 'percent': round(raw[2]['PERCENT_ANSWER'], 2)}
            self.disagree = {'value': raw[3]['VALUE'], 'total': raw[3]['ANSWERED_QUESTION'], 'percent': round(raw[3]['PERCENT_ANSWER'], 2)}
            self.strong_disagree = {'value': raw[4]['VALUE'], 'total': raw[4]['ANSWERED_QUESTION'], 'percent': round(raw[4]['PERCENT_ANSWER'], 2)}
        return

    def __str__(self):
        return str(self.__dict__)

    def __repr__(self):
        return str(self.__dict__)