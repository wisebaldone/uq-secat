import { Component, Input } from  '@angular/core';

import { CoursesService } from './courses.service';
import { Course } from './courses';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
})

export class CourseComponent {
    course: any;
    courseDescription: string = "";
    secats: Course[] = [];
    @Input() courseName: string = "LAWS1700";

    constructor(private coursesService: CoursesService) {
    }

    ngOnChanges() {
        this.course = this.coursesService.getCourse(this.courseName);
        if (this.course != null) {
            this.secats = [];
            for (let year in this.course) {
                console.log(this.course[year]);
                for (var i = 0; i < this.course[year].length; i++)
                    this.coursesService
                        .getSecat(this.courseName, year, parseInt(this.course[year][i]))
                        .then(secat => {this.secats.push(secat); console.log(this.secats);});
            }
        }
    }
}