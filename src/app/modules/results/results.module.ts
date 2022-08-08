import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { StudentResultsComponent } from 'src/app/components/student-results/student-results.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/angular/material.module';


@NgModule({
  declarations: [StudentResultsComponent],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class ResultsModule { }
