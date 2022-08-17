import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Student } from './../models/student';
import { Course } from '../models/course';
import { Level } from '../models/level';
import { ClassIdentifier } from './../models/class-identifier';

@Injectable({
  providedIn: 'root'
})
export class StudentService { 

  baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  getAllStudents():Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${this.baseUrl}/student/all`);
  }

  fetchStudent(studentId: number):Observable<Student>{ 
    return this.httpClient.get<Student>(`${this.baseUrl}/student/${studentId}`);
  }
  

  deleteStudent(studentId:number){
    this.httpClient.delete(`${this.baseUrl}/student/delete/${studentId}`);
  }

  updateStudent(student: Student): Observable<Student>{
    console.log('I am woringing to update student');
    return this.httpClient.put<Student>(`${this.baseUrl}/student/update`,student);
  }

  saveStudent(student:Student): Observable<Student>{
     return this.httpClient.post<Student>(`${this.baseUrl}/student/save`, student);
  }

  fetchClassOfStudent(course: Course, level: Level): Observable<Student[]>{
    // bundle course and level in class identifier type and pass it to request body
     let classIdentifier: ClassIdentifier = new ClassIdentifier();
     classIdentifier.course = course;
     classIdentifier.level = level;
     console.log(`final state of class identifier before calling httpclient`, course, level);
     
     return this.httpClient.post<Student[]>(`${this.baseUrl}/student/class`, classIdentifier);
  }

 
}
