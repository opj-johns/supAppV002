import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Professor } from '../models/professor';
import { Student } from '../models/student';
import { Subject } from '../models/subject';
import { ClassAttendance } from '../models/class-attendance'
import { Attendance } from '../models/attendance';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  baseUrl = 'http://localhost:8080';


  constructor(private httpClient: HttpClient) { }

   recordAttendance(professor: Professor, 
                   subject: Subject, 
                   students: Student[]): Observable<Attendance[]>{

    let classAttendance = new ClassAttendance();
    classAttendance.professor = professor;
    classAttendance.subject = subject;
    classAttendance.classStudents = students;
    

   return this.httpClient.post<Attendance[]>(`${this.baseUrl}/attendance/record/all`, classAttendance);
    
    
  }

}
