import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from 'src/app/components/attendance/attendance.component';
import { AttendanceSheetComponent } from 'src/app/components/attendance/take-attendance/attendance-sheet/attendance-sheet.component';
import { TakeAttendanceComponent } from 'src/app/components/attendance/take-attendance/take-attendance.component';
import { WeeklyAttendanceComponent } from 'src/app/components/attendance/weekly-attendance/weekly-attendance.component';
import { CreateWeeklyAttendaceComponent } from 'src/app/components/attendance/weekly-attendance/create-weekly-attendace/create-weekly-attendace.component';
import { CreateGeneralAttendanceComponent } from 'src/app/components/attendance/general-attendance/create-general-attendance/create-general-attendance.component';
import { GeneralAttendanceComponent } from 'src/app/components/attendance/general-attendance/general-attendance.component';

const routes: Routes = [
  {path:'', component: AttendanceComponent},
  {path:'take/:profId', component: TakeAttendanceComponent},
  {path:'weekly_sheet/:courseId/:levelId/:monthId/:weekId', component: WeeklyAttendanceComponent},
  {path:'gnr_absence/:levelId/:semesterId/:courseId', component: GeneralAttendanceComponent},
  {path:'weekly_sheet/create', component: CreateWeeklyAttendaceComponent},
  {path:'absence_vierge/create', component: CreateGeneralAttendanceComponent},
  {
    path:'sheet/:profId/:courseId/:levelId/:subjId',
    component: AttendanceSheetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
