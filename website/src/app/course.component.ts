import { Component, Input } from  '@angular/core';

import { CoursesService } from './courses.service';
import { Course } from './courses';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: [ './course.component.css']
})

export class CourseComponent {
    course: any;
    courseDescription: string = "";
    secats: Course[] = [];
    @Input() courseName: string = "LAWS1700";

    constructor(private coursesService: CoursesService) {
    }

    ngOnInit() {
        this.loadSecats();
    }

    ngOnChanges() {
        this.loadSecats();
    }

    loadSecats() {
        var courseCode = (' ' + this.courseName).toUpperCase().slice(1);
        this.course = this.coursesService.getCourse(courseCode);
        if (this.course != null) {
            this.secats = [];
            for (let year in this.course) {
                for (var i = 0; i < this.course[year].length; i++)
                    this.coursesService
                        .getSecat(courseCode, year, parseInt(this.course[year][i]))
                        .then(secat => {
                            this.secats.push(secat);
                            console.log(this.secats);
                            this.secats.sort(this.secatSort);
                        });
            }
        } else {
            this.secats = [];
        }
    }

    secatSort(a:Course, b:Course) {
        return (b.year + ":" + b.semester).localeCompare(a.year + ":" + a.semester);
    }
}