import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-professor-detail',
  templateUrl: './professor-detail.component.html',
  styleUrls: ['./professor-detail.component.scss']
})
export class ProfessorDetailComponent implements OnInit {

  professor: Professor = new Professor();

  constructor(private profService: ProfessorService,
              private activateRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.fetchProfessor();
  }

  fetchProfessor(){
    let professorId = Number(this.activateRoute.snapshot.paramMap.get("id"));
    if(professorId!==undefined){
      this.profService.getProfessor(professorId).subscribe({
        next:(professor)=>{
          console.log(`successfully fetched professor for detail page`, professor);
          this.professor = professor;
        },
        error: (error)=>{
          console.log(`Failed to fetch professor for detail page`, error);
        }
      })
    }else{
      console.log(`professor id retreived from router is undefined`);
    }
  }

  openProfessorEditPage(){
     this.router.navigateByUrl(`professors/edit/${this.professor.id}`);
  }

  deleteAction(){
   
  }

  openProfessorsPage(){
    this.router.navigateByUrl(`professors`);
  }
}
