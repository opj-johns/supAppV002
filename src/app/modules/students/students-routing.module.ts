import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolStudentsComponent } from 'src/app/components/school-students/school-students.component';
import { StudentDetailComponent } from 'src/app/components/school-students/student-detail/student-detail.component';
import { StudentEditComponent } from 'src/app/components/school-students/student-edit/student-edit.component';
import { StudentNewComponent } from 'src/app/components/school-students/student-new/student-new.component';

const routes: Routes = [
  {path:'', component: SchoolStudentsComponent},
  {path:'new', component: StudentNewComponent},
  {path:'student/edit/:id', component: StudentEditComponent},
  {path:'detail/:id', component: StudentDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
