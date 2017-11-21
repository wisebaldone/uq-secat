import { Component } from  '@angular/core';
import { FormControl } from '@angular/forms';

import { CoursesService } from './courses.service';

import {Observable} from "rxjs/Observable";
import {ActivatedRoute, Router} from "@angular/router";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'api',
    templateUrl: './api.component.html',
    styleUrls: [ './api.component.css']
})

export class ApiComponent {

    constructor() {
    }

    ngOnInit() {
    }

}