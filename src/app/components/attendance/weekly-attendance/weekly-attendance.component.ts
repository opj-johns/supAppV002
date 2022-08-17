import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { Level } from 'src/app/models/level';
import { Subject } from 'src/app/models/subject';
import { Month, Week } from 'src/app/models/weekly-attendance-identifier';
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
  startDate!:Date;
  endDate!:Date;
  weeklyAttendanceSheet!: WeeklyAttendanceSheet;

  constructor(private attendanceService: AttendanceService) {  }

  ngOnInit(): void {
    this.fetchWeeklyAttendanceSheet();
  }


  fetchWeeklyAttendanceSheet(){
    this.course = {id: 9, courseName: ''};
    this.level = {id:5, levelName: '', cycle: ''};
    this.startDate = new Date(1,2,1);
    this.endDate = new Date(2,2,1);

    this.attendanceService.fetchWeeklyAttendance(this.course, this.level, this.startDate, this.endDate).subscribe({
      next: (resp)=>{
      this.weeklyAttendanceSheet = resp;
        console.log(`successfully fetched weekly timetable`, resp)
    },
    error: (err)=>{console.log(`Error fetching weekly timetable`)}
    })
  }

}
