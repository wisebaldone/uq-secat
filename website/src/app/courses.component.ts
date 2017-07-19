import { Component, Input } from  '@angular/core';
import { FormControl } from '@angular/forms';

import { CoursesService } from './courses.service';

import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";

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

    constructor(private coursesService: CoursesService, route: ActivatedRoute) {
        this.initialCourse = route.snapshot.params['code'];
        this.coursesService.getCourses().then(courses => {
            this.courseList = courses;
        });
    }

    ngOnInit() {
        this.filteredOptions = this.courseSelector.valueChanges
            .startWith(null)
            .map(val => val ? this.filter(val) : []);
        if (this.initialCourse !== '') {
            console.log("HELLO");
            this.coursesService.announceNewCourse(this.initialCourse);
        }
    }

    filter(val: string): string[] {
        return this.courseList.filter(option => new RegExp(`^${val}`, 'gi').test(option));
    }

    updateChild() {
        console.log(this.courseSelector.value);
        this.coursesService.announceNewCourse(this.courseSelector.value.toUpperCase());
    }
}