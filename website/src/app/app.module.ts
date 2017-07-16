import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import {
  MdSidenavModule,
  MdButtonModule,
  MdToolbarModule,
  MdIconModule,
  MdInputModule,
  MdAutocompleteModule
} from '@angular/material';

import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course.component';

import { AppComponent } from './app.component';
import 'hammerjs';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MdSidenavModule,
    MdButtonModule,
    MdToolbarModule,
    MdIconModule,
    MdInputModule,
    MdAutocompleteModule
  ],
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
