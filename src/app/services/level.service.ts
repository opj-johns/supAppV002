import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Level } from '../models/level';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LevelService {
  
  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  getSchoolLevels(): Observable<Level[]> {
    console.log(`getting levels from backend`);
    return this.http.get<Level[]>(`${this.baseUrl}/level/all`);
  }

  updateLevel(level: Level): Observable<Level>{
    return this.http.put<Level>(`${this.baseUrl}/level/update`, level);
  }
  

  fetchLevel(levelId: number): Observable<Level>{
    return this.http.get<Level>(`${this.baseUrl}/level/${levelId}`);
    }
}
