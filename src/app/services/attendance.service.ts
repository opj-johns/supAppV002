import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Professor } from '../models/professor';
import { Student } from '../models/student';
import { Subject } from '../models/subject';
import { ClassAttendance } from '../models/class-attendance'
import { Attendance } from '../models/attendance';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { Level } from '../models/level';
import { WeeklyAttendanceIdentifier } from '../models/weekly-attendance-identifier';
import { ClassIdentifier } from '../models/class-identifier';
import { WeeklyAttendanceSheet } from '../models/weekly-attendance-sheet';
import { CreatedWeeklyAttendanceList } from '../models/created-weekly-attendance-list';

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

  fetchWeeklyAttendance(course: Course, 
                       level: Level, 
                       startDate: Date, 
                       endDate: Date):Observable<WeeklyAttendanceSheet>{

    let classIdentifier = new ClassIdentifier();
    classIdentifier.course = course;
    classIdentifier.level = level;

    let weeklyAttendanceId =  new WeeklyAttendanceIdentifier();
    weeklyAttendanceId.classIdentifier = classIdentifier;
    weeklyAttendanceId.startDate = startDate;
    weeklyAttendanceId.endDate = endDate;
    
   return this.httpClient.post<WeeklyAttendanceSheet>(`${this.baseUrl}/attendance/weekly_list`, weeklyAttendanceId);

  }

  fetchWeeklyCreatedAttendances(): Observable<CreatedWeeklyAttendanceList>{
   return this.httpClient.get<CreatedWeeklyAttendanceList>(`${this.baseUrl}/attendance/all/weekly_attendance`);
  }

}
