import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './shared/angular/material.module'
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavContentComponent } from './components/sidenav-content/sidenav-content.component';
import { ProfessorService } from './services/professor.service';
import { SubjectService } from './services/subject.service';
import { SchoolSubjectsComponent } from './components/school-subjects/school-subjects.component';
import { EditComponent } from './components/school-subjects/edit/edit.component';
import { NewComponent } from './components/school-subjects/new/new.component';
import { SubjectDetailComponent } from './components/school-subjects/subject-detail/subject-detail.component';
import { StudentService } from './services/student.service';
import { LevelService } from './services/level.service';
import { CourseService } from './services/course.service';
import { AttendanceService } from './services/attendance.service';
import { TimeTableService } from './services/time-table.service'
import { ClassroomService } from './services/classroom.service';



@NgModule({
  declarations: [
    FooterComponent,
    AppComponent,
    HeaderComponent,
    SidenavContentComponent,
    SchoolSubjectsComponent,
    EditComponent,
    NewComponent,
    SubjectDetailComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule 
  ],
  providers: [ProfessorService,SubjectService, StudentService,
  LevelService,
CourseService, AttendanceService,TimeTableService,
ClassroomService],

  bootstrap: [AppComponent]
})
export class AppModule { }
