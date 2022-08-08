import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeTableCreateComponent } from 'src/app/components/time-table/time-table-create/time-table-create.component';
import { TimeTableComponent } from 'src/app/components/time-table/time-table.component';
import { TimetableViewComponent } from 'src/app/components/time-table/timetable-view/timetable-view.component';
import { ViewNewEditComponent } from 'src/app/components/time-table/view-new-edit/view-new-edit.component';

const routes: Routes = [
  {path:'', component: TimeTableComponent},
  {path:'create', component: TimeTableCreateComponent},
  {path:'view/:courseId/:levelId', component: TimetableViewComponent},
  {path:'view_edit_new/:courseId/:levelId/:action', component: ViewNewEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimetableRoutingModule { }
