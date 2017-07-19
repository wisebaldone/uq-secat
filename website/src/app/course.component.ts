import { Component, Input } from  '@angular/core';

import { CoursesService } from './courses.service';
import { Course } from './courses';
import {Router} from "@angular/router";


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
    @Input() courseName: string = "";

    constructor(private coursesService: CoursesService, private router: Router) {
        coursesService.activeCourse.subscribe(courseCode => {
           console.log(courseCode);
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
        var courseCode = (' ' + this.courseName).toUpperCase().slice(1);
        this.course = this.coursesService.getCourse(courseCode);
        if (this.course != null) {
            this.router.navigate(["course/", courseCode]);
            this.secats = [];
            for (let year in this.course) {
                for (var i = 0; i < this.course[year].length; i++)
                    this.coursesService
                        .getSecat(courseCode, year, parseInt(this.course[year][i]))
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