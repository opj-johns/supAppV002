import { Component, OnInit } from '@angular/core';
import { Professor } from '../../models/professor';
import { ProfessorService } from 'src/app/services/professor.service';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-school-professors',
  templateUrl: './school-professors.component.html',
  styleUrls: ['./school-professors.component.scss']
})
export class SchoolProfessorsComponent implements OnInit {

  professors: Professor[] =[];

  constructor(private profService: ProfessorService, private router: Router) { } 

  ngOnInit(): void {
    this.getProfessors();
    
  }

  displayedColumns: string[] = ['firstName', 'lastName', 'phone'];
  dataSource = new MatTableDataSource();

  
  getProfessors(){
    this.profService.getAllProfessors().subscribe(profs => {
      this.professors = profs;
      this.dataSource.data = this.professors;
      console.log(profs);
    },
    error=>{
      console.log(error); 
    })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  gotTODetialPage(professor: Professor){
     this.router.navigateByUrl(`professors/detail/${professor.id}`);
  }
}
