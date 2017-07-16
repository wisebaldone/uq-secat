export class Course {
    course: string;
    description: string;
    year: string;
    enrolled: number;
    responses: number;
    rate: string;
    semester: number;

    q1: Secat;
    q2: Secat;
    q3: Secat;
    q4: Secat;
    q5: Secat;
    q6: Secat;
    q7: Secat;
    q8: Secat;
}

export class Secat {
    description: string;
    strong_agree: Question;
    agree: Question;
    neutral: Question;
    disagree: Question;
    strong_disagree: Question;
}

export class Question {
    value: number;
    total: number;
    percent: number;
}