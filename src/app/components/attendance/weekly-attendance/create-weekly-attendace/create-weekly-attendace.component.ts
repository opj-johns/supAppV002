import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Level } from 'src/app/models/level';
import { WeeklyAttendance } from 'src/app/models/weekly-attendance';
import { Month, Week, WeeklyAttendanceIdentifier } from 'src/app/models/weekly-attendance-identifier';
import { AttendanceService } from 'src/app/services/attendance.service';
import { CourseService } from 'src/app/services/course.service';
import { LevelService } from 'src/app/services/level.service';
import { MonthService } from 'src/app/services/month.service';
import { WeekService } from 'src/app/services/week.service';

@Component({
  selector: 'app-create-weekly-attendace',
  templateUrl: './create-weekly-attendace.component.html',
  styleUrls: ['./create-weekly-attendace.component.scss']
})
export class CreateWeeklyAttendaceComponent implements OnInit {

  courses!: Course[];
  levels!: Level[];
  months!: Month[];
  weeks!: Week[];  
  startDate!: Date;
  endDate!: Date;
  
  selectedCourseId!: number;
  selectedLevelId!: number;
  selectedMonthId!: number;
  selectedWeekId!: number;

  constructor(private courseService: CourseService,
              private levelService: LevelService,
              private attendaceService: AttendanceService,
              private router: Router,
              private weekService: WeekService,
              private monthService: MonthService) { }



  ngOnInit(): void {
    this.getCourses();
    this.fetchLevels();
    this.fetchMonths();
    this.fetchWeeks();
  }
  

  createWeekAttendanceSheet(form: NgForm){
     if (this.selectedCourseId === undefined || this.selectedLevelId === undefined || this.selectedMonthId === undefined || this.selectedWeekId === undefined){
      alert("Please provide all the details");
      return;
     }

     if(this.startDate.getDay() !== 1){
        alert("Start date must be a Monday");
        return;
     }
     if(this.endDate.getDay() !== 5){
      alert("Endate must be a Friday");
      return;
     }
     
    let course = new Course();
    course.id = Number(this.selectedCourseId);
    let level = new Level();
    level.id = Number(this.selectedLevelId);
    let month = new Month();
    month.id = Number(this.selectedMonthId);
    let week = new Week();
    week.id = Number(this.selectedWeekId);
    console.log(course,level,month,week);
    this.attendaceService.saveWeeklyAttendance(course,level,month,week,this.startDate, this.endDate ).subscribe({
      next:(resp)=>{
        console.log(`successfully save weekly attendance`, resp);
         this.routeToWeeklyAttendanceSheet(resp);
        
      },
      error:(err)=>{console.log(`Error saving weekly attendance`, err)}
    })
  }

   routeToWeeklyAttendanceSheet(weeklyAttendance: WeeklyAttendance){
    
    this.router.navigateByUrl(`/attendance/weekly_sheet/${weeklyAttendance.course?.id}/${weeklyAttendance.level?.id}/${weeklyAttendance.month.id}/${weeklyAttendance.week.id}`);
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

  fetchWeeks(){
    this.weekService.fetchAll().subscribe({
      next: (resp)=>{
        this.weeks = resp;
      },
      error:(err)=>{console.log(`Error fetching weeks for this page`)}
    })
  }

  fetchMonths(){
    this.monthService.fetchAll().subscribe({
      next: (resp)=>{
        this.months = resp;
      },
      error: (err)=>{
        console.log(`Error fetching months for this page`)
      }
    })
  }

}


