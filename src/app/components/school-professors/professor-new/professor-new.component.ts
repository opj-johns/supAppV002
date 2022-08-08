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
  selector: 'app-professor-new',
  templateUrl: './professor-new.component.html',
  styleUrls: ['./professor-new.component.scss']
})
export class ProfessorNewComponent implements OnInit, AfterViewInit {

  @ViewChild('paginator', {static: true}) paginator: MatPaginator | undefined; 
  @ViewChild(MatSort) sort!: MatSort;


  professor: Professor= new Professor();
  subjects: Subject[]=[];

    displayedColumns: string[] = ['id', 'subjectName'];
    dataSource!: MatTableDataSource<Subject>


    
    constructor(private profService: ProfessorService, 
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private subjectService: SubjectService) { }
      
      
      
      ngOnInit(): void {
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

     

  saveProfessor(){
    this.profService.savaProfessor(this.professor).subscribe({
      next: (prof)=>{
        console.log(`successfully saved professor`, prof);
        this.router.navigateByUrl(`/professors`);
      },
      error:(err)=>{
        console.log(`failed to save professor`, err);
        this.router.navigateByUrl(`/professors`);
      }
    })
    // console.log(`final state of professor to be saved to database`, this.professor);

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
  }


  goToProfessorsPage(){
    this.router.navigateByUrl(`professors`);
  }
}


