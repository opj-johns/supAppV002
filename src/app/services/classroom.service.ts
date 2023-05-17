import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classroom } from '../models/classroom';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  fetchClassrooms():Observable<Classroom[]>{
    return this.http.get<Classroom[]>(`${this.baseUrl}/classroom/all`);
  }
  
}
