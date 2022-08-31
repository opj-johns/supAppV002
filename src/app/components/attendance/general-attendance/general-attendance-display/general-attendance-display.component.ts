import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbsenceViergeIdResponse } from 'src/app/models/absence-viergeid-response';
import { ClassIdentifier } from 'src/app/models/class-identifier';
import { Course } from 'src/app/models/course';
import { Level } from 'src/app/models/level';
import { Semester } from 'src/app/models/weekly-attendance-identifier';
import { AttendanceService } from 'src/app/services/attendance.service';

@Component({
  selector: 'app-general-attendance-display',
  templateUrl: './general-attendance-display.component.html',
  styleUrls: ['./general-attendance-display.component.scss']
})
export class GeneralAttendanceDisplayComponent implements OnInit {

  absenceViergeResponseIds!: AbsenceViergeIdResponse;

  constructor(private router:Router,
              private attendanceService: AttendanceService) { }

  ngOnInit(): void {
    this.fetchAbsenceViergeIds();
  }

  
  fetchAbsenceViergeIds(){
     this.attendanceService.getSavedAbsenceViergeIds().subscribe({
      next:(resp)=>{
        this.absenceViergeResponseIds = resp;
        console.log(`Absence vierge ids`,resp);
      },
      error:(err)=>{
        console.log(`Error fetching absence vierge ids`,err);
      }
     })
  }


  routerToAbsenceViergePage(level: Level, semester: Semester, course: Course){
  this.router.navigateByUrl(`attendance/gnr_absence/${level.id}/${semester.id}/${course.id}`);
  }
}
