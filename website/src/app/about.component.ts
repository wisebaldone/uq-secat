import { Component } from  '@angular/core';
import { FormControl } from '@angular/forms';

import { CoursesService } from './courses.service';

import {Observable} from "rxjs/Observable";
import {ActivatedRoute, Router} from "@angular/router";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: [ './about.component.css']
})

export class AboutComponent {

    constructor() {
    }

    ngOnInit() {
    }

}