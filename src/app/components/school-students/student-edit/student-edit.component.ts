import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Level } from 'src/app/models/level';
import { Student } from 'src/app/models/student';
import { CourseService } from 'src/app/services/course.service';
import { LevelService } from 'src/app/services/level.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit {

  student!: Student;
  levels!: Level[];
  courses!: Course[];

  constructor(private studentService: StudentService, private router: Router, private activatedRoute: ActivatedRoute, private courseService: CourseService,
    private levelService: LevelService) { }

  ngOnInit(): void {
    this.getStudent();
    this.getLevels()
    this.getCourses();
  }

  getStudent(){
  let studentId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
   this.studentService.fetchStudent(studentId).subscribe(
      student=>{
        this.student = student;
        console.log(`successfully fetched student ${student} for editing`);
      },
      error=>{
        console.log(`Error fetching student for editing: ${error}`); 
      }
   )
  }
  
  getLevels(){
    this.levelService.getSchoolLevels().subscribe(
       levels=>{
         this.levels = levels;
         console.log(`successfully fetched levels for populating form : ${this.levels}`);
       },
       error=>{
        console.log(`Error fetching level for populating form: ${error}`);
       }
    )
  }

  getCourses(){
    this.courseService.getAllCoures().subscribe(
      courses=>{
        this.courses = courses;
        console.log(`successfully fetched coursess for populating form : ${this.courses}`);
      }, 
      error=>{
        console.log(`Error fetching courses for populating form: ${error}`);
      }
    )
  }

  updateStudent(){

    this.prepareStudentForSaving();
    this.studentService.updateStudent(this.student).subscribe({
      next: (student)=> {
        console.log(`successfully updated student: ${student}`, student);
        this.router.navigateByUrl(`/students/detail/${this.student.id}`);
      },
      error: (error)=>{ 
        console.log(` Error updating student: ${error}`, error);
        this.router.navigateByUrl(`/students/detail/${this.student.id}`);
      }
  })

  }

  prepareStudentForSaving(){
    // after filling the form,  course field contains courseId in string format
    // and level field also contains levelId in string format
    // we have to use those Ids to retreive their objects from the courses and levels list then set them into the student object 

    let courseId = Number(this.student.course);
    let course = this.courses.find(course => course.id === courseId);
    console.log(`successfully found course in courses list`, course);

    let levelId = Number(this.student.level);
    let level = this.levels.find(level => level.id === levelId);
    console.log(`successfully found level in courses list`, level);

    if(course !== undefined && level !== undefined){
      this.student.course = course;
      this.student.level = level;
    }
    console.log(`final state of student to be saved to database`, this.student);
  }



}
