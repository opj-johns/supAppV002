import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimetableRoutingModule } from './timetable-routing.module';
import { TimeTableComponent } from 'src/app/components/time-table/time-table.component';
import { TimeTableCreateComponent } from 'src/app/components/time-table/time-table-create/time-table-create.component';
import { MaterialModule } from 'src/app/shared/angular/material.module';
import { FormsModule } from '@angular/forms';
import { ViewNewEditComponent } from '../../components/time-table/view-new-edit/view-new-edit.component';
import { TimetableViewComponent } from 'src/app/components/time-table/timetable-view/timetable-view.component';


@NgModule({
  declarations: [
    TimeTableComponent,
    TimeTableCreateComponent,
    ViewNewEditComponent,
    TimetableViewComponent,
  ],
  imports: [
    CommonModule,
    TimetableRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class TimetableModule { }
