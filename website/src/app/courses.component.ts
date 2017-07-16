import { Component, Input } from  '@angular/core';
import { FormControl } from '@angular/forms';

import {} from './courses';
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'courses',
    templateUrl: './courses.component.html',
})

export class CoursesComponent {
    courses = ["CSSE2310", "CSSE2010"];
    courseSelector = new FormControl();
    filteredOptions: Observable<string[]>;

    ngOnInit() {
        this.filteredOptions = this.courseSelector.valueChanges
            .startWith(null)
            .map(val => val ? this.filter(val) : this.courses.slice());
    }

    filter(val: string): string[] {
        return this.courses.filter(option => new RegExp(`^${val}`, 'gi').test(option));
    }
}