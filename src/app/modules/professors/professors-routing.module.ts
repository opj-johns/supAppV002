import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessorDetailComponent } from 'src/app/components/school-professors/professor-detail/professor-detail.component';
import { ProfessorEditComponent } from 'src/app/components/school-professors/professor-edit/professor-edit.component';
import { ProfessorNewComponent } from 'src/app/components/school-professors/professor-new/professor-new.component';
import { SchoolProfessorsComponent } from 'src/app/components/school-professors/school-professors.component';


const routes: Routes = [
{path:'', component: SchoolProfessorsComponent},
{path:'new', component: ProfessorNewComponent},
{path:'detail/:id', component: ProfessorDetailComponent},
{path:'edit/:id', component: ProfessorEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessorsRoutingModule { }
