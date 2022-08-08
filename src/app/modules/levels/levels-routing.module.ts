import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolLevelsComponent } from 'src/app/components/school-levels/school-levels.component';

const routes: Routes = [
  {path:'', component: SchoolLevelsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LevelsRoutingModule { }
