import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Professor } from '../models/professor'

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  baseUrl = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { } 

  getAllProfessors(): Observable<Professor[]>{ 
    return this.httpClient.get<Professor[]>(`${this.baseUrl}/professor/all`);
  } 

  getProfessor(professorId: number): Observable<Professor>{
    return this.httpClient.get<Professor>(`${this.baseUrl}/professor/${professorId}`);
  }

  updateProfesssor(professor: Professor): Observable<Professor>{
    return this.httpClient.put<Professor>(`${this.baseUrl}/professor/update`, professor);
  }
  

  savaProfessor(professor: Professor): Observable<Professor>{
    return this.httpClient.put<Professor>(`${this.baseUrl}/professor/add`, professor);
  }
}
