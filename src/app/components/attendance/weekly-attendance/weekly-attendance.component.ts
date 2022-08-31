import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Level } from 'src/app/models/level';
import { Subject } from 'src/app/models/subject';
import { DateFormat, Month, Week } from 'src/app/models/weekly-attendance-identifier';
import { WeeklyAttendanceSheet } from 'src/app/models/weekly-attendance-sheet';
import { AttendanceService } from 'src/app/services/attendance.service';

@Component({
  selector: 'app-weekly-attendance',
  templateUrl: './weekly-attendance.component.html',
  styleUrls: ['./weekly-attendance.component.scss']
})
export class WeeklyAttendanceComponent implements OnInit {

  subjects!: Subject[];
  course!: Course;
  level!: Level;
  week!: Week;
  month!: Month;
  startDate:Date = new Date();
  endDate:Date = new Date;
  weeklyAttendanceSheet!: WeeklyAttendanceSheet;

  constructor(private attendanceService: AttendanceService,
              private activatedRoute: ActivatedRoute) {  }

  ngOnInit(): void {
    this.fetchWeeklyAttendanceSheet();
  }


  fetchWeeklyAttendanceSheet(){ 
    
    let courseId = Number(this.activatedRoute.snapshot.paramMap.get('courseId'));
    let levelId = Number(this.activatedRoute.snapshot.paramMap.get('levelId'));
    let monthId = Number(this.activatedRoute.snapshot.paramMap.get('monthId'));
    let weekId = Number(this.activatedRoute.snapshot.paramMap.get('weekId'));


    console.log(courseId, levelId, monthId, weekId);
    

      this.attendanceService.fetchWeeklyAttendance(courseId, levelId, monthId, weekId).subscribe({
        next: (resp)=>{
        
        this.setValues(resp);
        console.log(resp);
      },
      error: (err)=>{console.log(`Error fetching weekly timetable`)}
      })
   
    
  }

  setValues(sheet: WeeklyAttendanceSheet){
     this.level = sheet.weeklyAttendanceIdentifier.classIdentifier.level;
     this.course = sheet.weeklyAttendanceIdentifier.classIdentifier.course;

     this.startDate = sheet.weeklyAttendanceIdentifier.startDate;
    this.week = sheet.weeklyAttendanceIdentifier.week;
    this.month = sheet.weeklyAttendanceIdentifier.month;
     this.weeklyAttendanceSheet = sheet;
  }

  recordWeeklyAttendance(){
    console.log(this.weeklyAttendanceSheet.weeklyAttendanceIdentifier.month.semester)
     this.attendanceService.recordWeeklyAttendanceInAbsenceVierge(this.weeklyAttendanceSheet).subscribe({
      next:(resp)=>{
        console.log(`Bundled absence vierge list to be saved`, resp);
        //  if(resp==true){
        //      alert('successfully recorded weekly attendance');
             
        //  }else{
        //    alert('Absence Vierge not created');
        //  }
      },
      error: (err)=>{console.log(`Error recording weekly attendance`, err)}
     })
  }
}


