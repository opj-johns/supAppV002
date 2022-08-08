import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Professor } from 'src/app/models/professor';
import { Subject } from 'src/app/models/subject';
import { ProfessorService } from 'src/app/services/professor.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-professor-edit',
  templateUrl: './professor-edit.component.html',
  styleUrls: ['./professor-edit.component.scss']
})
export class ProfessorEditComponent implements OnInit, AfterViewInit {

  @ViewChild('paginator', {static: true}) paginator: MatPaginator | undefined; 
  @ViewChild(MatSort) sort!: MatSort;


  professor: Professor= new Professor();
  subjects: Subject[]=[];
  showSubjects: boolean=false;

    displayedColumns: string[] = ['id', 'subjectName'];
    dataSource!: MatTableDataSource<Subject>


    
    constructor(private profService: ProfessorService, 
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private subjectService: SubjectService) { }
      
      
      
      ngOnInit(): void {
        this.getProfessor();
        this.getSubjects();
      }

      ngAfterViewInit() {
        if(this.paginator !== undefined  && this.sort !== undefined){
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }else{
          console.log("paginator is undefined for professor edit page")
          console.log('this is sort',this.sort);
        }
      }

     

  updateProfessor(){
    this.profService.updateProfesssor(this.professor).subscribe({
      next: (prof)=>{
        console.log(`successfully saved professor`, prof);
        this.router.navigateByUrl(`/professors/detail/${prof.id}`);
      },
      error:(err)=>{
        console.log(`failed to save professor`, err);
        this.router.navigateByUrl(`/professors/detail/${this.professor.id}`);
      }
    })
  }


  getProfessor(){
    let professorId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    if( professorId !== undefined ){
      this.profService.getProfessor(professorId).subscribe({
        next: (professor)=>{
          this.professor = professor;
          console.log(`successfully retreived professor for edit professor page`, this.professor);
        },
        error: (error)=>{
        console.log(`failed to retrieve professor for edit professor page`, error);
        }
      })
    }
  }
  
  getSubjects(){
    this.subjectService.getAllSubjects().subscribe({
      next:(subjects)=>{
        this.subjects = subjects
        console.log(`successfully fetched subjects for edti professor page`, this.subjects)
        this.dataSource = new MatTableDataSource(this.subjects);
         if(this.paginator !== undefined){
          this.dataSource.paginator = this.paginator;
        }else{
          console.log("paginator is undefined for professor edit page", this.paginator);
        }
      },
      error: (error)=>{
        console.log(`Failed to fetch subjects for professor detail page`, error);
      }
    })
  }


   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addSubject(subject: Subject){
    let subjectExists = this.professor.subjectsTaught?.find(subj=>subj.id === subject.id);
    // if subject does not exist already in subjects taught on professor object, then add it
    if(subjectExists===undefined){
      this.professor.subjectsTaught?.push(subject);
    }
  }

  toggleSubjects(){
   this.professor.subjectsTaught = [];
   this.showSubjects = !this.showSubjects;
  }

  doneSelectingSubjects(){
    this.showSubjects = !this.showSubjects;
  }

  goToDetailPage(){
    this.router.navigateByUrl(`professors/detail/${this.professor.id}`);
  }
}


