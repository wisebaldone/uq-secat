import { Component, Input } from  '@angular/core';

import { CoursesService } from './courses.service';
import { Course } from './courses';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
})

export class CourseComponent {
    course: any;
    secat: Course;
    @Input() courseName: string = "LAWS1700";

    constructor(private coursesService: CoursesService) {
    }

    ngOnChanges() {
        this.course = this.coursesService.getCourse(this.courseName);
        if (this.course != null) {
            this.coursesService
                .getSecat(this.courseName, "2017", 1)
                .then(secat => this.secat = secat);
        }
    }
}