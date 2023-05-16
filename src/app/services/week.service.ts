import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Week } from '../models/weekly-attendance-identifier';

@Injectable({
  providedIn: 'root'
})
export class WeekService {

  baseUrl = 'http://localhost:1010';

  constructor(private Http: HttpClient) { }

  fetchAll():Observable<Week[]>{
    return this.Http.get<Week[]>(`${this.baseUrl}/week/all`);
  }
}
