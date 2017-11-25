import { Injectable, isDevMode } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Course } from './courses';
import {Subject} from "rxjs/Subject";

@Injectable()
export class CoursesService {
    courses: any = {};
    courseList: string[] = [];
    api:string = "api/";

    private readySource = new Subject<boolean>();
    ready = this.readySource.asObservable();

    private activeCourseSource = new Subject<string>();
    activeCourse = this.activeCourseSource.asObservable();

    constructor(private http: Http) {
        this.http.get(this.api + "courses.json")
            .toPromise()
            .then(response => {
                this.courses = response.json();
                this.courseList = Object.keys(this.courses);
                this.readySource.next(true);
            })
            .catch(this.handleError);
    }

    getCourses(): Promise<string[]> {
        return this.http.get(this.api + "courses.json")
            .toPromise()
            .then(response => Object.keys(response.json()))
            .catch(this.handleError);
    }

    getCourse(code: string): any {
        if (this.courses.hasOwnProperty(code)) {
            return this.courses[code];
        } else {
            return null;
        }
    }

    getSecat(code: string, year: string, sem: number): Promise<Course> {
        return this.http.get(this.api + code + "/" + year + "/" + sem + ".json")
            .toPromise()
            .then(response => response.json() as Course)
            .catch(this.handleError);
    }

    handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    announceNewCourse(course: string) {
        console.log("Got: " + course);
        this.activeCourseSource.next(course);
    }
}