import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Course } from './courses';

@Injectable()
export class CoursesService {
    courses: any = {};
    courseList: string[] = [];

    constructor(private http: Http) {
        this.http.get("api/courses.json")
            .toPromise()
            .then(response => {
                this.courses = response.json();
                this.courseList = Object.keys(this.courses);
            })
            .catch(this.handleError);
    }

    getCourses(): Promise<string[]> {
        return this.http.get("api/courses.json")
            .toPromise()
            .then(response => Object.keys(response.json()))
            .catch(this.handleError);
    }

    getCourse(code: string): Course {
        return;
    }

    handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}