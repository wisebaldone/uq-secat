import { Component } from  '@angular/core';
import { FormControl } from '@angular/forms';

import { CoursesService } from './courses.service';

import {Observable} from "rxjs/Observable";
import {ActivatedRoute, Router} from "@angular/router";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'courses',
    templateUrl: './courses.component.html',
    styleUrls: [ './courses.component.css']
})

export class CoursesComponent {
    courseSelector = new FormControl();
    filteredOptions: Observable<string[]>;
    courseList: string[] = [];
    initialCourse: string = "";

    constructor(private coursesService: CoursesService, private route: ActivatedRoute, private router: Router) {
        this.initialCourse = route.snapshot.params['code'];
        this.coursesService.getCourses().then(courses => {
            this.courseList = courses;
        });
    }

    ngOnInit() {
        this.filteredOptions = this.courseSelector.valueChanges
            .startWith(null)
            .map(val => val ? this.filter(val) : []);
        this.coursesService.ready.subscribe(ready => {
            if (!isNullOrUndefined(this.initialCourse)) {
                this.coursesService.announceNewCourse(this.initialCourse);
            }
        });
    }

    filter(val: string): string[] {
        return this.courseList.filter(option => new RegExp(`^${val}`, 'gi').test(option));
    }

    updateChild() {
        var course = (' ' + this.courseSelector.value).toUpperCase().slice(1);
        if (course.length == 8 && this.coursesService.getCourse(course) != null) {
            var change:Promise<boolean> = this.router.navigate(["./course/", course]);
            change.then(value => {
                this.coursesService.announceNewCourse(course);
            });
        }
    }
}