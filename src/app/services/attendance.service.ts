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
import { Month, Semester, Week, WeeklyAttendanceIdentifier } from '../models/weekly-attendance-identifier';
import { ClassIdentifier } from '../models/class-identifier';
import { WeeklyAttendanceSheet } from '../models/weekly-attendance-sheet';
import { CreatedWeeklyAttendanceList } from '../models/created-weekly-attendance-list';
import { WeeklyAttendance } from '../models/weekly-attendance';
import { AbsenceViergeIdentifierType } from '../models/absence-vierge-identifier-type';
import { AbsenceViergeIdentifier } from '../models/absence-vierge-identifier';
import { AbsenceViergeIdResponse } from '../models/absence-viergeid-response';
import { AVMonthRecord } from '../models/absence-vierge-month-record';
import { AbsentViergeAuthAbsent } from '../models/absence-vierge-auth-absent';
import { AbsenceVierge } from '../models/AbsenceVierge';

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
    classAttendance.date = new Date();
      
    return this.httpClient.post<Attendance[]>(`${this.baseUrl}/attendance/record/all`, classAttendance);
    
    
  }

  fetchWeeklyAttendance(courseId: number, 
                       levelId: number, 
                       monthId: number, 
                       weekId: number):Observable<WeeklyAttendanceSheet>{

    let classIdentifier = new ClassIdentifier();
    let course = new Course();
    course.id = courseId;
    let level = new Level();
    level.id = levelId;
    classIdentifier.course= course;
    classIdentifier.level = level;
    

    let weeklyAttendanceId =  new WeeklyAttendanceIdentifier();
    weeklyAttendanceId.classIdentifier = classIdentifier;
    let month = new Month();
    month.id = monthId;
    let week = new Week();
    week.id = weekId;
    weeklyAttendanceId.month = month;
    weeklyAttendanceId.week = week;
    
   return this.httpClient.post<WeeklyAttendanceSheet>(`${this.baseUrl}/attendance/weekly_list`, weeklyAttendanceId);

  }

  saveWeeklyAttendance(course: Course, level: Level, month: Month, week: Week, startDate: Date, endDate: Date): Observable<WeeklyAttendance>{

    let classIdentifier = new ClassIdentifier();
    classIdentifier.course = course;
    classIdentifier.level= level;
    let weeklyAttendanceId = new WeeklyAttendanceIdentifier();
    weeklyAttendanceId.classIdentifier = classIdentifier;
    weeklyAttendanceId.startDate = startDate;
    weeklyAttendanceId.endDate = endDate;
    weeklyAttendanceId.month = month;
    weeklyAttendanceId.week = week;

    console.log(`ready to save : `,weeklyAttendanceId)
   return this.httpClient.post<WeeklyAttendance>(`${this.baseUrl}/attendance/save/weekly_attendance`, weeklyAttendanceId);
  }

  fetchWeeklyCreatedAttendances(): Observable<CreatedWeeklyAttendanceList>{
   return this.httpClient.get<CreatedWeeklyAttendanceList>(`${this.baseUrl}/attendance/all/weekly_attendance`);
  }

  saveAbsenceVierge(course: Course, level:Level, semester: Semester):Observable<AbsenceViergeIdentifier>{
    
   
    let absenceViergeId = new AbsenceViergeIdentifierType();
    absenceViergeId = this.createAbsenceViergeType(course,level,semester);
       return this.httpClient.post<AbsenceViergeIdentifier>(`${this.baseUrl}/attendance/save/absence_vierge`, absenceViergeId);
  }

  getSavedAbsenceViergeIds():Observable<AbsenceViergeIdResponse>{
   return this.httpClient.get<AbsenceViergeIdResponse>(`${this.baseUrl}/attendance/all/absence_vierge_ids`);
  }

  

  fetchStudentAvRecord(course: Course, level: Level, semester: Semester):Observable<AVMonthRecord[][]>{
    let absenceViergeId = new AbsenceViergeIdentifierType();
    absenceViergeId = this.createAbsenceViergeType(course,level,semester);
   return this.httpClient.post<AVMonthRecord[][]>(`${this.baseUrl}/attendance/all/avmonth_record`, absenceViergeId);
  }


  private createAbsenceViergeType(course: Course, level:Level, semester: Semester): AbsenceViergeIdentifierType{

    let classIdentifier = new ClassIdentifier();
    classIdentifier.course = course;
    classIdentifier.level = level;
    let absenceViergeId = new AbsenceViergeIdentifierType();
    
    absenceViergeId.classIdentifier = classIdentifier;
    absenceViergeId.semester = semester;

    return absenceViergeId;
  }


   recordObervationAndRemark(month: Month, semester: Semester, level: Level, student: Student, course: Course, remark: string, authAbsents: number )
  : Observable<AbsentViergeAuthAbsent>
  {

    let absenceViergeAuthAbsent = new AbsentViergeAuthAbsent();
  absenceViergeAuthAbsent.month = month;
  absenceViergeAuthAbsent.semester = semester;
  absenceViergeAuthAbsent.level = level;
  absenceViergeAuthAbsent.student = student;
  absenceViergeAuthAbsent.course  = course;
  absenceViergeAuthAbsent.remark = remark;
  absenceViergeAuthAbsent.authorizedAbsents = authAbsents;
  console.log(`Final absenceViergeAuthAbsent to save`, absenceViergeAuthAbsent);
 return this.httpClient.post<AbsentViergeAuthAbsent>(`${this.baseUrl}/attendance/save/remark_auth_absents`, absenceViergeAuthAbsent);
  }


   recordWeeklyAttendanceInAbsenceVierge(weeklyAttendanceSheet: WeeklyAttendanceSheet ):Observable<AbsenceVierge[]>{
    return this.httpClient.post<AbsenceVierge[]>(`${this.baseUrl}/attendance/record/weekly_attendance_sheet`, weeklyAttendanceSheet);      
  }
}
