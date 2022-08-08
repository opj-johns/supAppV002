import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classroom } from '../models/classroom';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  fetchClassrooms():Observable<Classroom[]>{
    return this.http.get<Classroom[]>(`${this.baseUrl}/classroom/all`);
  }
  
}
