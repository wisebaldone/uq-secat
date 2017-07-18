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
  MdAutocompleteModule,
  MdTabsModule
} from '@angular/material';
import { HttpModule }    from '@angular/http';

import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course.component';

import { AppComponent } from './app.component';
import {CoursesService} from "./courses.service";
import 'hammerjs';
import {SecatComponent} from "./secat.component";


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MdSidenavModule,
    MdButtonModule,
    MdToolbarModule,
    MdIconModule,
    MdInputModule,
    MdAutocompleteModule,
    MdTabsModule
  ],
  providers: [ CoursesService ],
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseComponent,
    SecatComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
