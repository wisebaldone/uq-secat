import { Component } from  '@angular/core';

import { CoursesService } from './courses.service';
import { Course } from './courses';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: [ './course.component.css']
})

export class CourseComponent {
    course: any;
    courseCode: string = "";
    courseDescription: string = "";
    secats: Course[] = [];
    courseName: string = "Type a course code above.";

    constructor(private coursesService: CoursesService) {
        this.coursesService.activeCourse.subscribe(courseCode => {
            this.courseName = courseCode;
            this.loadSecats();
        });
    }

    ngOnInit() {
    }

    loadSecats() {
        this.course = this.coursesService.getCourse(this.courseName);
        if (this.course != null) {
            this.secats = [];
            for (let year in this.course) {
                for (var i = 0; i < this.course[year].length; i++)
                    this.coursesService
                        .getSecat(this.courseName, year, parseInt(this.course[year][i]))
                        .then(secat => {
                            this.secats.push(secat);
                            this.secats.sort(this.secatSort);
                            if (this.courseCode != secat.course) {
                                this.courseCode = secat.course;
                                this.courseDescription = secat.description;
                            }
                        });
            }
        } else {
            console.error("Invalid Course: {" + this.courseName + "}");
            this.secats = [];
            this.courseCode = "";
            this.courseDescription = "";
        }
    }

    secatSort(a:Course, b:Course) {
        return (b.year + ":" + b.semester).localeCompare(a.year + ":" + a.semester);
    }
}