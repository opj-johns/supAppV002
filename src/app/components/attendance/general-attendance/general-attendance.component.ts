import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/services/attendance.service';
import { StudentService } from 'src/app/services/student.service';
import { MonthService } from 'src/app/services/month.service'
import { AVMonthRecord } from 'src/app/models/absence-vierge-month-record';
import { Month, Semester } from 'src/app/models/weekly-attendance-identifier';
import { Student } from 'src/app/models/student';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Level } from 'src/app/models/level';
import { MatDialog } from '@angular/material/dialog';
import { RecordObservationComponent } from './record-observation/record-observation.component';
import { AbsentViergeAuthAbsent } from 'src/app/models/absence-vierge-auth-absent';

@Component({
  selector: 'app-general-attendance',
  templateUrl: './general-attendance.component.html',
  styleUrls: ['./general-attendance.component.scss']
})
export class GeneralAttendanceComponent implements OnInit {
  headings: string[]= []
  months!: Month[];
  studentsInClass!: Student[];
  studentAvMonthRecords: AVMonthRecord[][]=[]; 
  semesterId!: number;
  courseId!: number;
  levelId!: number;
  views: unknown[][]=[];
  course!:Course;
  level!: Level;
  absenceViergeAuthAbsent!: AbsentViergeAuthAbsent;

  constructor(private attendanceService: AttendanceService,
              private studentService: StudentService,
              private monthService: MonthService,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.extractRouteParams();
    this.getStudentAvRecords();
    this.getMonths();
    this.getStudentsInClass();
    
  }

  ngBeforeViewInit(){

  }

  prepareView(resp: AVMonthRecord[][]){
     for(let s=0; s<this.studentsInClass.length; s++){
         this.views[s] = [];
         let semesterTotal = 0;
        for(let m=0; m<this.months.length; m++){

            let total = 0;
            for(let r=0; r<5; r++){

              this.views[s].push(resp[s][m].record[r]);
              
              if(r===4){
                total -= resp[s][m].record[r];
                continue;
              }
              total += resp[s][m].record[r];
            }
            // add total
            semesterTotal += total;
            this.views[s].push(total);
            console.log('running...');
            // add remark
            this.views[s].push(resp[s][m].remark); 
            //add saction
            if(total===0){
              this.views[s].push('OK');
            }else{
               if(total>0 && total<=5){
                this.views[s].push('Avertissement');
               }else{
                  if(total >5 && total <=9){
                      this.views[s].push('Blame');
                  }else{
                    this.views[s].push('Convocation');
                  }
               }
            }
            
        }
        this.views[s].push(semesterTotal);
     }
     this.studentAvMonthRecords = resp;
     console.log(this.views);
  }

  setSanction( s: number,startIndex: number ,total: number){
        if(total===0){
              this.views[s][startIndex]='OK';
            }else{
               if(total>0 && total<=5){
                this.views[s][startIndex]='Avertissement';
               }else{
                  if(total >5 && total <=9){
                      this.views[s][startIndex]='Blame';
                  }else{
                    this.views[s][startIndex]='Convocation';
                  }
               }
            }
  }

   setHeadings(){
      for(let i = 0; i< this.months.length; i++){
          this.headings.push('sem 1', 'sem 2', 'sem 3', 'sem 4','Absence Authorisée','Total', 'Observ','Sanction');
      }
     console.log(this.headings);
    }



  extractRouteParams(){
   this.courseId=  Number(this.activatedRoute.snapshot.paramMap.get('courseId'));
   this.semesterId = Number(this.activatedRoute.snapshot.paramMap.get('semesterId'));
   this.levelId = Number(this.activatedRoute.snapshot.paramMap.get('levelId'));
   if(this.courseId === NaN || this.semesterId === NaN || this.levelId === NaN){
    console.log(`Unable to extract route parameters`);
  }
  }

  getMonths(){
    let semester = new Semester();
    semester.id = this.semesterId;
     this.monthService.fetchMonthWithSemester(semester).subscribe({
      next:(resp)=>{
        this.months = resp;
        console.log(`Fetched months:`, this.months);
        this.setHeadings();
      },
      error:(err)=>{
        console.log(`Error fetching months:`, err);
      }
     })
  }

  getStudentsInClass(){
    let course = new Course();
    course.id = this.courseId;
    let level = new Level();
    level.id = this.levelId;
    this.studentService.fetchClassOfStudent(course,level).subscribe({
      next:(resp)=>{
        this.studentsInClass = resp;
        this.course = resp[0].course;
        this.level = resp[0].level;
        console.log(`Fected class of students:`, this.studentsInClass);
      },
      error:(err)=>{
        console.log(`Error fetching students in class`, err);
      }
    })
  }

  getStudentAvRecords(){
    let course = new Course();
    course.id = this.courseId;
    let level = new Level();
    level.id = this.levelId;
    let semester = new Semester();
    semester.id = this.semesterId;
    this.attendanceService.fetchStudentAvRecord(course,level,semester).subscribe({
      next:(resp)=>{
      console.log(`Fetched student av records`, resp);

        this.prepareView(resp);
      },
      error:(err)=>{
        console.log(`Error fetching student av records`,err);
      }
    })
  }

  recordObservation(studentIndex: number){
    
   let dialogRef= this.dialog.open(RecordObservationComponent, {
          width:'550px',
          height:'350px',
          position: { top: '130px', left:'430px'},
          autoFocus: true,
          hasBackdrop:true,
          data: {months: this.months, student:this.studentsInClass[studentIndex] }
       });

    dialogRef.afterClosed().subscribe({
      next:(result)=>{
        if(result!==null){
          console.log(`Result: `,result);
          this.saveObservationAndRemark(result, studentIndex);
        }
      },
      error:(err)=>{console.log(`could not get password`, err)}
    })
  }
  
  saveObservationAndRemark(result: any, studentIndex: number){

   let selectedMonthIndex = Number(result.monthIndex);
  
    let semester =new Semester();
    semester.id = this.semesterId;
    let month = new Month();
    month.id = this.months[selectedMonthIndex].id;
    
    this.attendanceService.recordObervationAndRemark(month,semester,this.level,this.studentsInClass[studentIndex], this.course, result.observ, result.authAbsents ).subscribe({
      next:(resp)=>{
        
        alert('successfully save data');
        console.log(resp);
         this.absenceViergeAuthAbsent = resp;
         let total = 0;
         for(let i=0; i<4; i++){
            total+= this.studentAvMonthRecords[studentIndex][selectedMonthIndex].record[i];
         }
         total-= resp.authorizedAbsents;
         let startIndex = selectedMonthIndex * 8 + 4;
         this.views[studentIndex][startIndex++] = resp.authorizedAbsents;
         // subtract the existing total from semester total
         // and add the new total
         let existingSemesterTotal =  Number(this.views[studentIndex][this.views[0].length-1])  
         existingSemesterTotal -= Number(this.views[studentIndex][startIndex]); 
         existingSemesterTotal += total;
         this.views[studentIndex][this.views[0].length-1] = existingSemesterTotal;
         this.views[studentIndex][startIndex++] = total;
         this.views[studentIndex][startIndex++] = resp.remark;
         this.setSanction(studentIndex,  startIndex,total);
      },
      error:(err)=>{console.log(`Error saving remark`,err)}
    })
  }

}
