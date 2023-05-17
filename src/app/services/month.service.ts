import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Month, Semester } from '../models/weekly-attendance-identifier';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MonthService {

 baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  fetchAll():Observable<Month[]>{
    return this.http.get<Month[]>(`${this.baseUrl}/month/all`);
  }

  fetchMonthWithSemester(semester: Semester):Observable<Month[]>{
    return this.http.post<Month[]>(`${this.baseUrl}/month/all/in_semester`, semester);
  }
}
