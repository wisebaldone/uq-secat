import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MdSidenavModule, MdButtonModule } from '@angular/material';

import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course.component';

import { AppComponent } from './app.component';
import 'hammerjs';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    MdSidenavModule,
    MdButtonModule
  ],
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
