import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from 'src/app/components/attendance/attendance.component';
import { AttendanceSheetComponent } from 'src/app/components/attendance/take-attendance/attendance-sheet/attendance-sheet.component';
import { TakeAttendanceComponent } from 'src/app/components/attendance/take-attendance/take-attendance.component';

const routes: Routes = [
  {path:'', component: AttendanceComponent},
  {path:'take', component: TakeAttendanceComponent},
  {
    path:'take/:profId/:courseId/:levelId',
    component: AttendanceSheetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
