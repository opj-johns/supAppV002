import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Level } from 'src/app/models/level';
import { Subject } from 'src/app/models/subject';
import { DateFormat, Month, Week } from 'src/app/models/weekly-attendance-identifier';
import { WeeklyAttendanceSheet } from 'src/app/models/weekly-attendance-sheet';
import { AttendanceService } from 'src/app/services/attendance.service';
import { NgxCaptureService } from 'ngx-capture';
import { tap } from 'rxjs';

@Component({
  selector: 'app-weekly-attendance',
  templateUrl: './weekly-attendance.component.html',
  styleUrls: ['./weekly-attendance.component.scss']
})
export class WeeklyAttendanceComponent implements OnInit {

  @ViewChild('attendance', { static: true }) attendanceSheet: any;

  subjects!: Subject[];
  course!: Course;
  level!: Level;
  week!: Week;
  month!: Month;
  startDate:Date = new Date();
  endDate:Date = new Date;
  weeklyAttendanceSheet!: WeeklyAttendanceSheet;

  constructor(private attendanceService: AttendanceService,
              private activatedRoute: ActivatedRoute,
              private captureService: NgxCaptureService) {  }

  ngOnInit(): void {
    this.fetchWeeklyAttendanceSheet();
  }

  capture()
  {
    console.log("Hello");
   this.captureService.getImage(this.attendanceSheet.nativeElement, true)
.pipe(
     tap((img: any) => {

                console.log("Hello");
                console.log(img);
            //  let file =   this.DataURIToBlob(img)
            //  console.log(file);
             this.print(img);
     })
).subscribe();
    
  }

   print(file: string){
     
      let img = document.createElement("img");
      // console.log(`File to string:`,file.text())
      // this.blobImage = file;
      img.src = file; 
      window.location.href = img.src.replace('image/png', 'image/octet-stream');
      console.log(`Up till here`);
      // const formData = new FormData();
      // formData.append('file', file, 'image.png');
      // // console.log(formData.get("file"));
      
      let container = document.createElement("div");
      container.appendChild(img);
      let winPrint = window.open('', '', `left=0,top=0,width=${this.attendanceSheet.width},height=${this.attendanceSheet.height},toolbar=0,scrollbars=0,status=0`);
         winPrint?.document.appendChild(container);
        // winPrint?.focus();
        winPrint?.print();
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


