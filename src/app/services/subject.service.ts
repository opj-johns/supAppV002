import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

   baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { } 

  getAllSubjects(): Observable<Subject[]>{

    return this.httpClient.get<Subject[]>(`${this.baseUrl}/subject/all`);
    
  }

  addNewSubject(subject: Subject):Observable<Subject>
  { return  this.httpClient.post<Subject>(`${this.baseUrl}/subject/add`, subject) }  


  getSubject(subjectId: number): Observable<Subject>{
    return this.httpClient.get<Subject>(`${this.baseUrl}/subject/${subjectId}`);
  }


  updateSubject(subject: Subject): Observable<Subject>{
    return this.httpClient.put<Subject>(`${this.baseUrl}/subject/update`, subject);
  }

  deleteSubject(subjectId :number): Observable<any>{
   return this.httpClient.delete(`${this.baseUrl}/subject/delete/${subjectId}`);
  }
}
