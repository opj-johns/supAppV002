import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CreatedWeeklyAttendanceList } from 'src/app/models/created-weekly-attendance-list';
import { Level } from 'src/app/models/level';
import { Month, Week } from 'src/app/models/weekly-attendance-identifier';
import { AttendanceService } from 'src/app/services/attendance.service';

@Component({
  selector: 'app-weekly-attendance-display',
  templateUrl: './weekly-attendance-display.component.html',
  styleUrls: ['./weekly-attendance-display.component.scss']
})
export class WeeklyAttendanceDisplayComponent implements OnInit {

  createdWeeklyAttendances!: CreatedWeeklyAttendanceList;



  constructor( private router: Router, private AttendanceService: AttendanceService) { }

  ngOnInit(): void {
    this.getAllCreatedWeeklyAttendace()
  }

  routeToWeeklyAttendanceView(course: Course, level: Level, month: Month, week: Week ){
      this.router.navigateByUrl(`attendance/weekly_sheet/${course.id}/${level.id}/${month.id}/${week.id}`);
  }


  getAllCreatedWeeklyAttendace(){
    this.AttendanceService.fetchWeeklyCreatedAttendances().subscribe({
      next:(resp)=>{
          this.createdWeeklyAttendances = resp;
          console.log(`successfully fetched fetchWeeklyCreatedAttendances: `, this.createdWeeklyAttendances);
      },
      error:(err)=>{
          console.log(`Error fetching created weekly attendances`, err);
      }
    })
  }
}
