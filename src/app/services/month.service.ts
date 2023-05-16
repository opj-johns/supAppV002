import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Month, Semester } from '../models/weekly-attendance-identifier';


@Injectable({
  providedIn: 'root'
})
export class MonthService {

 baseUrl = 'http://localhost:1010';

  constructor(private http: HttpClient) { }

  fetchAll():Observable<Month[]>{
    return this.http.get<Month[]>(`${this.baseUrl}/month/all`);
  }

  fetchMonthWithSemester(semester: Semester):Observable<Month[]>{
    return this.http.post<Month[]>(`${this.baseUrl}/month/all/in_semester`, semester);
  }
}
