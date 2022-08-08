import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Student } from 'src/app/models/student';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-school-students',
  templateUrl: './school-students.component.html',
  styleUrls: ['./school-students.component.scss']
})
export class SchoolStudentsComponent implements OnInit {
  displayedColumns: string[] = ['mat', 'firstName', 'lastName'];
  dataSource = new MatTableDataSource();

  students: Student[]=[];

  constructor(private studentService: StudentService, 
              private route: Router) { }
  
  ngOnInit(): void {
    this.getStudents(); 
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } 
  
  getStudents(){
    this.studentService.getAllStudents().subscribe(students=>{
      this.students = students;
      this.dataSource.data = this.students;
    },
    error=>{
      console.log(error); 
    });
  }

  showDetailPage(student: Student){
     this.route.navigateByUrl(`students/detail/${student.id}`);
  }
}
