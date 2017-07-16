import { Component, Input } from  '@angular/core';
import { FormControl } from '@angular/forms';

import { CoursesService } from './courses.service';

import {Observable} from "rxjs/Observable";

@Component({
    selector: 'courses',
    templateUrl: './courses.component.html',
    styleUrls: [ './courses.component.css']
})

export class CoursesComponent {
    courseSelector = new FormControl();
    filteredOptions: Observable<string[]>;
    courseList: string[] = [];
    constructor(private coursesService: CoursesService) {
        this.coursesService.getCourses().then(courses => {
            this.courseList = courses;
        });
    }

    ngOnInit() {
        this.filteredOptions = this.courseSelector.valueChanges
            .startWith(null)
            .map(val => val ? this.filter(val) : []);
    }

    filter(val: string): string[] {
        return this.courseList.filter(option => new RegExp(`^${val}`, 'gi').test(option));
    }
}