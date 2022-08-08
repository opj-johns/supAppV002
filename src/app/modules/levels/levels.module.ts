import { NgModule } from '@angular/core';
import { LevelsRoutingModule } from './levels-routing.module';
import { MaterialModule } from 'src/app/shared/angular/material.module';
import { FormsModule } from '@angular/forms';
import { SchoolLevelsComponent } from 'src/app/components/school-levels/school-levels.component';
import { EditLevelComponent } from 'src/app/components/school-levels/edit-level/edit-level.component';


@NgModule({
  declarations: [
    SchoolLevelsComponent,
    EditLevelComponent
  ],
  imports: [
    LevelsRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class LevelsModule { }
