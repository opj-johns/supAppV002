import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Professor } from '../models/professor'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { } 

  getAllProfessors(): Observable<Professor[]>{ 
    return this.httpClient.get<Professor[]>(`${this.baseUrl}/professor/all`);
  } 

  getProfessor(professorId: number): Observable<Professor>{
    return this.httpClient.get<Professor>(`${this.baseUrl}/professor/${professorId}`);
  }

  getProfessorByPassword(password: string):Observable<Professor>{
    return this.httpClient.post<Professor>(`${this.baseUrl}/professor/p_pwd`, password);
  }

  updateProfesssor(professor: Professor): Observable<Professor>{
    return this.httpClient.put<Professor>(`${this.baseUrl}/professor/update`, professor);
  }
  

  savaProfessor(professor: Professor): Observable<Professor>{
    return this.httpClient.put<Professor>(`${this.baseUrl}/professor/add`, professor);
  }

  
}
