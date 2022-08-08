import { NgModule } from '@angular/core';

import { StudentsRoutingModule } from './students-routing.module';
import { MaterialModule } from 'src/app/shared/angular/material.module';
import { SchoolStudentsComponent } from 'src/app/components/school-students/school-students.component';
import { StudentDetailComponent } from 'src/app/components/school-students/student-detail/student-detail.component';
import { StudentEditComponent } from 'src/app/components/school-students/student-edit/student-edit.component';
import { StudentNewComponent } from 'src/app/components/school-students/student-new/student-new.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SchoolStudentsComponent,
    StudentDetailComponent,
    StudentEditComponent,
    StudentNewComponent
  ],
  imports: [
    StudentsRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class StudentsModule { }
