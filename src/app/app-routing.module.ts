import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './components/school-subjects/edit/edit.component';
import { NewComponent } from './components/school-subjects/new/new.component';
import { SchoolSubjectsComponent } from './components/school-subjects/school-subjects.component';
import { SubjectDetailComponent } from './components/school-subjects/subject-detail/subject-detail.component';

const routes: Routes = [
   {path: 'subjects', component: SchoolSubjectsComponent}, {path:'subjects/new', component: NewComponent}, 
   {path: 'subjects/detail/:id', component: SubjectDetailComponent},
  {path: 'subjects/edit/:id', component: EditComponent},
   {path:'subjects/new', component: NewComponent},
   {path:'professors', 
   loadChildren: ()=> import('./modules/professors/professors.module').then(m=>m.ProfessorsModule)
  },
  {path:'students', loadChildren: ()=> import('./modules/students/students.module').then(m=>m.StudentsModule)}
  ,
   {path:'courses', loadChildren: ()=> import('./modules/courses/courses.module').then(m=>m.CoursesModule) },
   {path:'levels', loadChildren:()=>import('./modules/levels/levels.module').then(m=>m.LevelsModule)},
   {path:'attendance', loadChildren:()=>import('./modules/attendance/attendance.module').then(m=>m.AttendanceModule)},
   {path:'timetable', loadChildren:()=>import('./modules/timetable/timetable.module').then(m=>m.TimetableModule)},
   {path:'results', loadChildren:()=>import('./modules/results/results.module').then(m=>m.ResultsModule)},
   {path:'', redirectTo:'subjects', pathMatch: 'full'},   
   {path:'**', redirectTo:'subjects', pathMatch: 'full'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
