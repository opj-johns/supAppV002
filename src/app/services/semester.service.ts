import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Semester } from '../models/weekly-attendance-identifier';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SemesterService {

  baseUrl =  environment.baseUrl;
  constructor(private http: HttpClient) { }


  getSemesters():Observable<Semester[]>{
    return this.http.get<Semester[]>(`${this.baseUrl}/semester/all`);
  }

}
