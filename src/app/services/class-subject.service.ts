import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassSubject } from '../models/class-subjects';
import { Course } from '../models/course';
import { Level } from '../models/level';
import { Subject } from '../models/subject';
import { ClassIdentifier } from '../models/class-identifier';

@Injectable({
  providedIn: 'root'
})
export class ClassSubjectService {

  baseUrl = 'http://localhost:8080';


  constructor(private http: HttpClient) { }

  saveClassSubjects(course: Course, level: Level, subjects: Subject[]):Observable<ClassSubject[]>{
   // for each subject, create a class subject 
   let classSubjects: ClassSubject[]=[];
   subjects.forEach(subject =>{
      let classSubject: ClassSubject = new ClassSubject();
      classSubject.course = course;
      classSubject.level=level;
      classSubject.subject = subject;
      classSubjects.push(classSubject);
   })

   return this.http.post<ClassSubject[]>(`${this.baseUrl}/class_subjects/save`,classSubjects);

  }

  fetchClassSsubjects(course:Course, level:Level):Observable<Subject[]>{
     let classIdentifier = new ClassIdentifier();
     classIdentifier.course = course;
     classIdentifier.level = level;
    return this.http.post<Subject[]>(`${this.baseUrl}/class_subjects/all_subjects_only`, classIdentifier);
  }
  

}
