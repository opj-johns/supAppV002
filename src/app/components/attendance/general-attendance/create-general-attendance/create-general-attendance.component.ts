import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Course } from 'src/app/models/course';
import { Level } from 'src/app/models/level';
import {  Semester } from 'src/app/models/weekly-attendance-identifier';
import { AttendanceService } from 'src/app/services/attendance.service';
import { CourseService } from 'src/app/services/course.service';
import { LevelService } from 'src/app/services/level.service';
import { SemesterService } from 'src/app/services/semester.service';

@Component({
  selector: 'app-create-general-attendance',
  templateUrl: './create-general-attendance.component.html',
  styleUrls: ['./create-general-attendance.component.scss']
})
export class CreateGeneralAttendanceComponent implements OnInit {


  courses!: Course[];
  levels!: Level[];
  semesters!: Semester[];
  

  selectedCourseId!: number;
  selectedLevelId!: number;
  selectedSemesterId!: number;

  constructor(private courseService: CourseService,
              private levelService: LevelService,
              private semesterService: SemesterService,
              private attendaceService: AttendanceService) { }

  ngOnInit(): void {
    this.getCourses();
    this.fetchLevels();
    this.fetchSemesters();
  }

   getCourses(){
    this.courseService.getAllCoures().subscribe({
      next: (resp)=>{
        this.courses = resp;
      },
      error: (err)=>{console.log(`Error fetching courses form this page`)}
    })
  }

  fetchLevels(){
    console.log("fetching from backend")
    this.levelService.getSchoolLevels().subscribe({
      next:(resp)=>{
        this.levels = resp;
      },
      error:(err)=>{
        console.log(`Error fetching levels form this page`)
      }
    })
  }

  fetchSemesters(){
   this.semesterService.getSemesters().subscribe({
    next:(resp)=>{
      this.semesters = resp;
      console.log(`Semesters: `, resp);
    },
    error:(err)=>{console.log(`Error fecting semesters for this page`)}
   })
  }

  createGeneralAttendanceSheet(form: NgForm){
     if(this.selectedCourseId === undefined || this.selectedLevelId === undefined || this.selectedSemesterId === undefined){
       alert("Please select all fields");
       return;
     }

    let course = new Course();
    course.id = this.selectedCourseId;
    let level = new Level();
    level.id = this.selectedLevelId;
    let semester = new Semester();
    semester.id = this.selectedSemesterId;
    alert(`Hello`);
    this.attendaceService.saveAbsenceVierge(course, level, semester).subscribe({
      next:(resp)=>{
        alert(`Successfully saved absence vierge`);
           console.log(`Saved Absence vierge:`, resp);
      },
      error:(err)=>{
        console.log(`Error saving absence vierge`);
      }
    })

  }
}
