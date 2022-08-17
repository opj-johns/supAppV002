import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Level } from 'src/app/models/level';
import { Student } from 'src/app/models/student';
import { CourseService } from 'src/app/services/course.service';
import { LevelService } from 'src/app/services/level.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-new',
  templateUrl: './student-new.component.html',
  styleUrls: ['./student-new.component.scss']
})
export class StudentNewComponent implements OnInit {

  student: Student= new Student;
  levels: Level[]=[];
  courses: Course[]=[];
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private studentService: StudentService, private levelService: LevelService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.getCourses();
    this.getLevels();
  }

  saveStudent(){
    this.prepareStudentForSaving();

    this.studentService.saveStudent(this.student).subscribe({
      next:(student)=>{
        console.log(`successfully saved student: `, student);
        this.router.navigateByUrl(`/students`);
      },
      error: (error)=>{
        console.log(`failed to save student: `, error);
        this.router.navigateByUrl(`/students`);
      }
    })
  }

  getLevels(){
    this.levelService.getSchoolLevels().subscribe({
      next: (levels)=>{ 
        this.levels = levels;
        console.log(`successfully fetched levels to populate add new student form`,  this.levels);
      },
      error: (error)=>{
        console.log(`Faild to retreive levels to populate add new student form`, error);
      }
    })
  }

  getCourses(){
    this.courseService.getAllCoures().subscribe({
      next:(courses)=>{
        this.courses = courses;
        console.log(`successfully fetched courses to populate add new student form`, this.courses);
      },
      error: (error)=>{
        console.log(`Faild to retreive courses to populate add new student form`, error); 
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
