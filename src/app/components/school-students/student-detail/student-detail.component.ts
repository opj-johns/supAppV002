import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {

  student!: Student;

  constructor(private route: Router, private activatedRoute: ActivatedRoute, private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent(){
    let studentId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    if(studentId !== undefined){

      this.studentService.fetchStudent(studentId).subscribe(
        student =>{
          this.student = student;
          console.log(`successfully fetched student ${this.student}`)
        }, 
        error=>{
          console.log(`Failed to fetch student with id ${studentId}, error:${error}`);
        }
      )
    }else{
      console.log(`student id is undefined while fetching student for detail page`);
    }
  }

  showStudents(){
    this.route.navigateByUrl('students');
  }

  openStudentEditPage(){ 
     let studentId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    if(studentId !== undefined){
      this.route.navigateByUrl(`/students/edit/${studentId}`);
    }else{
      console.log(`student id is undefined while fetching student for detail page`);
    }
  }

  deleteAction(){
    
  }
}
