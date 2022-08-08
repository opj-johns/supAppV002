import { NgModule } from '@angular/core';
import { ProfessorsRoutingModule } from './professors-routing.module';
import { MaterialModule } from 'src/app/shared/angular/material.module';
import { ProfessorDetailComponent } from 'src/app/components/school-professors/professor-detail/professor-detail.component';
import { ProfessorEditComponent } from 'src/app/components/school-professors/professor-edit/professor-edit.component';
import { ProfessorNewComponent } from 'src/app/components/school-professors/professor-new/professor-new.component';
import { SchoolProfessorsComponent } from 'src/app/components/school-professors/school-professors.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SchoolProfessorsComponent,
    ProfessorDetailComponent,
    ProfessorEditComponent,
    ProfessorNewComponent,
  ],
  imports: [
    ProfessorsRoutingModule,
    MaterialModule,
    FormsModule,
  ]
})
export class ProfessorsModule { }
