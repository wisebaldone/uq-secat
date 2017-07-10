import json

class CourseDescription(object):

    def __init__(self, raw, description):
        self.course = raw[0]['COURSE_CD']
        self.description = description.split(":")[0]
        self.year = raw[0]['SEMESTER_DESCR'].split(",")[1].strip()
        self.semester = int(raw[0]['SEMESTER_DESCR'].split(" ")[1].split(",")[0])
        self.q1 = QuestionDescription(raw[0:5])
        self.q2 = QuestionDescription(raw[5:10])
        self.q3 = QuestionDescription(raw[10:15])
        self.q4 = QuestionDescription(raw[15:20])
        self.q5 = QuestionDescription(raw[20:25])
        self.q6 = QuestionDescription(raw[25:30])
        self.q7 = QuestionDescription(raw[30:35])
        self.q8 = QuestionDescription(raw[35:])
        return

    def __str__(self):
        return str(self.__dict__)

    def __repr__(self):
        return str(self.__dict__)


class QuestionDescription(object):

    def __init__(self, raw):
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