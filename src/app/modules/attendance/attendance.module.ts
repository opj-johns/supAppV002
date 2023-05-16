import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/angular/material.module';
import { AttendanceComponent } from 'src/app/components/attendance/attendance.component';
import { TakeAttendanceComponent } from 'src/app/components/attendance/take-attendance/take-attendance.component';
import { AttendanceSheetComponent } from 'src/app/components/attendance/take-attendance/attendance-sheet/attendance-sheet.component';
import { WeeklyAttendanceComponent } from 'src/app/components/attendance/weekly-attendance/weekly-attendance.component';
import { CreateWeeklyAttendaceComponent } from 'src/app/components/attendance/weekly-attendance/create-weekly-attendace/create-weekly-attendace.component';
import { WeeklyAttendanceDisplayComponent } from 'src/app/components/attendance/weekly-attendance/weekly-attendance-display/weekly-attendance-display.component';
import { CreateGeneralAttendanceComponent } from 'src/app/components/attendance/general-attendance/create-general-attendance/create-general-attendance.component';
import { GeneralAttendanceComponent } from 'src/app/components/attendance/general-attendance/general-attendance.component';
import { GeneralAttendanceDisplayComponent } from 'src/app/components/attendance/general-attendance/general-attendance-display/general-attendance-display.component';
import { RecordObservationComponent } from 'src/app/components/attendance/general-attendance/record-observation/record-observation.component';
import { NgxCaptureModule} from 'ngx-capture';



@NgModule({
  declarations: [
    AttendanceComponent,
    TakeAttendanceComponent,
    AttendanceSheetComponent,
    WeeklyAttendanceComponent,
    CreateWeeklyAttendaceComponent,
    WeeklyAttendanceDisplayComponent,
    GeneralAttendanceDisplayComponent,
    CreateGeneralAttendanceComponent,
    GeneralAttendanceComponent,
    RecordObservationComponent
    
  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    FormsModule,
    MaterialModule,
    NgxCaptureModule
  ]
})
export class AttendanceModule { }
