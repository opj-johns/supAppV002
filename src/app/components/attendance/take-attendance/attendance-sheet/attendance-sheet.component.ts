import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Level } from 'src/app/models/level';
import { Professor } from 'src/app/models/professor';
import { Student } from 'src/app/models/student';
import { Subject } from 'src/app/models/subject';
import { AttendanceService } from 'src/app/services/attendance.service';
import { CourseService } from 'src/app/services/course.service';
import { LevelService } from 'src/app/services/level.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-attendance-sheet',
  templateUrl: './attendance-sheet.component.html',
  styleUrls: ['./attendance-sheet.component.scss']
})
export class AttendanceSheetComponent implements OnInit ,AfterViewInit{

  absentStudents!: Student[];
  presentStudents: Student[]=[];
  professor!: Professor;
  subject!: Subject;
  subjectId!: number; 
  level!: Level;
  course!:Course;
  noOfSubjectsTaught: number=0;


  constructor(private professorService: ProfessorService,
              private studentService: StudentService,
              private courseService: CourseService,
              private levelService: LevelService,
              private activatedRoute: ActivatedRoute,
              private attendanceService: AttendanceService) { }

  ngOnInit(): void {
    this.getLevel();
    this.getCourse();
    this.fetchProfessor();
  }

  ngAfterViewInit(): void {
    this.fetchAbsentStudent();
   
  }

  sendToPresentList(student: Student){
    console.log("sendToPresentList called hello");
    
      console.log( this.presentStudents.push(student));
    
      console.log("sendToPresentList called");
      let index = this.absentStudents.indexOf(student);
       console.log('index of ', student,'is',index);
 
      this.absentStudents.splice(index,1);
  }

  sendToAbsentList(student: Student){
    console.log("sendToAbsentList called")
    
      this.absentStudents.push(student);
       let index = this.presentStudents.indexOf(student);
       console.log('index of ', student,'is',index);
      this.presentStudents.splice(index,1);
  }

  setNumberOfSubjects(){
  if(this.professor.subjectsTaught?.length !== undefined){
     this.noOfSubjectsTaught = this.professor.subjectsTaught.length; 
     console.log(this.professor.subjectsTaught?.length );
   }else{
    console.log(this.professor, " has undefined number of subjects taught");
   }
  }


  fetchAbsentStudent(){
   
     this.studentService.fetchClassOfStudent(this.course, this.level).subscribe({
      next: (respStudents)=>{
        console.log(`successfully loaded class of students for attendance sheet page`, respStudents);
        this.absentStudents = respStudents;
      },
      error: (err)=>{
        console.log(`failed to load class of students for attendance sheet page`, err);
      }
     })
  }


  recordAttendanceSheet(){  
     console.log(this.subject);
    console.log(this.professor);
    console.log(this.presentStudents);
    this.attendanceService.recordAttendance(this.professor, this.subject, this.presentStudents).subscribe({
      next:(resp)=>{
        console.log(`successfully recorded attendance sheet`, resp);
      },
      error: (err)=>{
        console.log(`failed to record attendance sheet`, err);
      }
    })
  }


  fetchProfessor(){
    let professorId = Number(this.activatedRoute.snapshot.paramMap.get("profId"));
    if(professorId !== undefined){
      this.professorService.getProfessor(professorId).subscribe({
        next:(prof)=>{
          this.professor = prof;
          console.log(`successfully fetched professor for attendance sheet page`, this.professor);
          this.setNumberOfSubjects();
          if(prof.subjectsTaught?.length===1){
             this.subject = prof.subjectsTaught[0];
          }
        },
        error:(err)=>{
          console.log(`failed to fetch professor for attendance sheet page `, err);
        }
      })
    }else{
      console.log(`professor id retrieved from route parameter is undefiend`)
    }
  }

  fetchClassStudents(){
    if(this.course !== undefined && this.level !== undefined){
      this.studentService.fetchClassOfStudent(this.course, this.level).subscribe({
        next: (respStudents)=>{
          this.absentStudents = respStudents;
          console.log(`successfully fetched class of student for attendance sheet page`, respStudents);

        }, 
        error:(err)=>{
          console.log(`failed to fetch class of students for attendance sheet page:`, err);
        }
      })
    }else{
      console.log(`Either course or level is undefined while fetching class of students for attendance sheet page`, this.course, this.level);
    }
  }
  
  getCourse(){
    let courseId = Number(this.activatedRoute.snapshot.paramMap.get('courseId'));
    if(courseId!== undefined){
      this.courseService.fetchCourse(courseId).subscribe({
        next: (respCourse)=>{
          this.course = respCourse;
          console.log(`successfully fetched course for attendance sheet page`, this.course);
        },
        error: (err)=>{
          console.log(`failed to fetch course for attendance sheet page`, err);
        }
      })
    }else{
      console.log(`course id of route parameter is undefined. Cannot fetch course for attendance sheet page`);
    }
  }

  getLevel(){
    console.log(`get level method is called`);
    let levelId = Number(this.activatedRoute.snapshot.paramMap.get('levelId'));
    if(levelId !== undefined){
      this.levelService.fetchLevel(levelId).subscribe({
        next: (respLevel)=>{
          this.level = respLevel;
          console.log(`successfully fetched level for attendance sheet page`, this.level);
        }
      })
    }else{
      console.log(`level id of route parameter is undefined. Cannot fetch level for attendance sheet page`);
    }
  }

}
