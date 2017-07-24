import { Component, Input } from  '@angular/core';

import { CoursesService } from './courses.service';
import { Course } from './courses';
import {Router} from "@angular/router";
import {isNullOrUndefined} from "util";


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
    courseName: string = "HELLO";

    constructor(private coursesService: CoursesService) {
        coursesService.activeCourse.subscribe(courseCode => {
           this.courseName = courseCode;
           this.loadSecats();
        });
        coursesService.ready.subscribe(ready => {
            this.loadSecats();
        })
    }

    ngOnInit() {
        this.loadSecats();
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
            this.secats = [];
            this.courseCode = "";
            this.courseDescription = "";
        }
    }

    secatSort(a:Course, b:Course) {
        return (b.year + ":" + b.semester).localeCompare(a.year + ":" + a.semester);
    }
}