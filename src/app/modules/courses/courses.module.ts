import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/angular/material.module';
import { SchoolCoursesComponent } from 'src/app/components/school-courses/school-courses.component';
import { EditCourseComponent } from 'src/app/components/school-courses/edit-course/edit-course.component';
import { NewCourseComponent } from 'src/app/components/school-courses/new-course/new-course.component';


@NgModule({
  declarations: [
    SchoolCoursesComponent,
    EditCourseComponent,
    NewCourseComponent
  ],
  imports: [
    CoursesRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class CoursesModule { }
