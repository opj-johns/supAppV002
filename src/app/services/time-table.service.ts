import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassIdentifier } from '../models/class-identifier';
import { Classroom } from '../models/classroom';
import { Course } from '../models/course';
import { Level } from '../models/level';
import { TBDay } from '../models/tb-day';
import { TBStartTime } from '../models/tb-start-time';
import { TBEndTime } from '../models/TBEndTime';
import { TimeTable } from '../models/time-table';
import { ClassroomStatusIdentifier } from './../models/classroom-status-identifier'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TimeTableService {

   baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  checkClassroomStatus(day:TBDay, startTime: TBStartTime, endTime:TBEndTime):Observable<Classroom[]>{
    
  //  sent a post request with classroom status identifier 

  let classroomStatusChecker: ClassroomStatusIdentifier = new ClassroomStatusIdentifier();
  
  classroomStatusChecker.day = day;
  classroomStatusChecker.startTime = startTime;
  classroomStatusChecker.endTime = endTime;
  console.log(`Classroom status checker`, classroomStatusChecker);
  return this.http.post<Classroom[]>(`${this.baseUrl}/timetable/classroom_status`, classroomStatusChecker);

}

  saveNewTimeTableRecord(timeTableList: TimeTable[]):Observable<TimeTable[]>{
    return this.http.post<TimeTable[]>(`${this.baseUrl}/timetable/save/all`, timeTableList);
  }

  getClassTimetable(course: Course, level:Level): Observable<TimeTable[]>{

    let classId = new ClassIdentifier();
    classId.course = course;
    classId.level = level;

     return this.http.post<TimeTable[]>(`${this.baseUrl}/timetable/all_class`, classId);
  }
  
  getSavedTImeTableIds():Observable<Set<ClassIdentifier>>{
    return this.http.get<Set<ClassIdentifier>>(`${this.baseUrl}/timetable/all_ids`);
  }
}
