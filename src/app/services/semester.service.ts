import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Semester } from '../models/weekly-attendance-identifier';

@Injectable({
  providedIn: 'root'
})
export class SemesterService {

  baseUrl =  "http://localhost:8080";
  constructor(private http: HttpClient) { }


  getSemesters():Observable<Semester[]>{
    return this.http.get<Semester[]>(`${this.baseUrl}/semester/all`);
  }

}
