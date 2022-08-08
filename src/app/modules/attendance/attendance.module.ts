import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/angular/material.module';
import { AttendanceComponent } from 'src/app/components/attendance/attendance.component';
import { TakeAttendanceComponent } from 'src/app/components/attendance/take-attendance/take-attendance.component';
import { AttendanceSheetComponent } from 'src/app/components/attendance/take-attendance/attendance-sheet/attendance-sheet.component';


@NgModule({
  declarations: [
    AttendanceComponent,
    TakeAttendanceComponent,
    AttendanceSheetComponent
  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class AttendanceModule { }
