import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCourseComponent } from 'src/app/components/school-courses/edit-course/edit-course.component';
import { NewCourseComponent } from 'src/app/components/school-courses/new-course/new-course.component';
import { SchoolCoursesComponent } from 'src/app/components/school-courses/school-courses.component';

const routes: Routes = [
  {path:'', component: SchoolCoursesComponent},
  {path:'new', component: EditCourseComponent},
  {path:'edit/:id', component: NewCourseComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
