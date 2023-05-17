import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Week } from '../models/weekly-attendance-identifier';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WeekService {

  baseUrl = environment.baseUrl;

  constructor(private Http: HttpClient) { }

  fetchAll():Observable<Week[]>{
    return this.Http.get<Week[]>(`${this.baseUrl}/week/all`);
  }
}
