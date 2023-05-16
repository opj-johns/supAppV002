import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  baseUrl = 'http://localhost:1010';

  constructor(private httpClient: HttpClient) { }

  getAllCoures():Observable<Course[]>{
    return this.httpClient.get<Course[]>(`${this.baseUrl}/course/all`);
  }

  addCourse(course:Course): Observable<Course>{
   return this.httpClient.post<Course>(`${this.baseUrl}/course/add`, course);
  }
  

  fetchCourse(courseId: number): Observable<Course>{
    return this.httpClient.get<Course>(`${this.baseUrl}/course/${courseId}`);
  }

  updateCourse(course:Course): Observable<Course>{
   return this.httpClient.put<Course>(`${this.baseUrl}/course/update`, course)
  }
  
}
