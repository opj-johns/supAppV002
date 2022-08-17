import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-attendance-sheet',
  templateUrl: './attendance-sheet.component.html',
  styleUrls: ['./attendance-sheet.component.scss']
})
export class AttendanceSheetComponent implements OnInit {

  professor!: Professor;
  subject!: Subject;
  level!: Level;
  course!:Course;
  absent:string = '-2';
  students: Student[]=[];
  selectedState: string[]=[];
  selectedStudentIds: number[]=[]; 
  courseId!:number;
  levelId!:number;
  professorId!:number;
  subjectId!:number;

  constructor(private professorService: ProfessorService,
              private studentService: StudentService,
              private courseService: CourseService,
              private levelService: LevelService,
              private activatedRoute: ActivatedRoute,
              private attendanceService: AttendanceService,
              private subjectService: SubjectService,
              private router: Router) { }

  ngOnInit(): void {
      this.fetchRouteParams();
     this.getLevel();
     this.getCourse();
     this.fetchProfessor();
     this.fetchSubject();
     this.fetchClassStudents();
  }

  fetchRouteParams(){
    this.courseId = Number(this.activatedRoute.snapshot.paramMap.get("courseId"));
    this.levelId = Number(this.activatedRoute.snapshot.paramMap.get("levelId"));
    this.professorId = Number(this.activatedRoute.snapshot.paramMap.get("profId"));
    this.subjectId = Number(this.activatedRoute.snapshot.paramMap.get("subjId"));
  }

  
  onSelect(indexofId: number, studentId: number){
      let studId = Number(this.selectedState[indexofId]);

      if(studId === -2){
         alert("Not a number");
         // if student is added to already, remove it 
          let index = this.selectedStudentIds.findIndex(x=> x === studentId);
          if(index!==-1){
             this.selectedStudentIds.splice(index,1);
          } 
          console.log(this.selectedStudentIds);
          return;
      }
      // if studentId is not added already, add it
      if(studentId === studId){
          let index2 = this.selectedStudentIds.findIndex(x=>x===studentId);
          if(index2===-1){
            this.selectedStudentIds.push(studentId);
          }
          console.log(this.selectedStudentIds);
      }
  }

  recordAttendanceSheet(){  
    console.log(this.subject);
    console.log(this.professor);
    let studentsPresent: Student[] = [];
    this.selectedStudentIds.forEach(studentId =>{
      let student = new Student();
      student.id = studentId;
      studentsPresent.push(student);
    })
     console.log(`students present`, studentsPresent);
    this.attendanceService.recordAttendance(this.professor, this.subject, studentsPresent).subscribe({
      next:(resp)=>{
        console.log(`successfully recorded attendance sheet`, resp);
        alert(`Successfully recorded ${studentsPresent.length}`);
        this.router.navigateByUrl('attendance');
      },
      error: (err)=>{
        console.log(`failed to record attendance sheet`, err);
      }
    })
  }


  fetchProfessor(){
    if(this.professorId !== undefined){
      this.professorService.getProfessor(this.professorId).subscribe({
        next:(prof)=>{
          this.professor = prof;
          console.log(`successfully fetched professor for attendance sheet page`, this.professor);
         
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
     this.course = {id: this.courseId, courseName:''};
     this.level = { id: this.levelId, levelName: '', cycle:''};

    if(this.course !== undefined && this.level !== undefined){
      this.studentService.fetchClassOfStudent(this.course, this.level).subscribe({
        next: (respStudents)=>{
          this.students = respStudents;
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
    if(this.courseId!== undefined){
      this.courseService.fetchCourse(this.courseId).subscribe({
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
    if( this.levelId !== undefined ){
      this.levelService.fetchLevel(this.levelId).subscribe({
        next: (respLevel)=>{
          this.level = respLevel;
          console.log(`successfully fetched level for attendance sheet page`, this.level);
        }
      })
    }else{
      console.log(`level id of route parameter is undefined. Cannot fetch level for attendance sheet page`);
    }
  }

  fetchSubject(){
    let subjectId = Number(this.activatedRoute.snapshot.paramMap.get('subjId'));
    this.subjectService.getSubject(subjectId).subscribe({
      next:(resp)=>{
        this.subject = resp;
      },
      error:(err)=>{
        console.log(`Error fetching subject for attendance sheet page`,err);
      }
    })
    
  }

}
