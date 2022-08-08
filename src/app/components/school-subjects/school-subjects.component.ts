import { AfterViewInit, Component,  OnDestroy,  OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Subject } from 'src/app/models/subject';
import { SubjectService } from 'src/app/services/subject.service';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-school-subjects',
  templateUrl: './school-subjects.component.html',
  styleUrls: ['./school-subjects.component.scss']
})
export class SchoolSubjectsComponent implements OnInit, OnDestroy {

   displayedColumns: string[] = ['id', 'subjectName'];
   dataSource!: MatTableDataSource<Subject>;       
  
   subjects: Subject[]=[];  

  constructor(private subjectSerivice: SubjectService, private router: Router, private route:ActivatedRoute) { } 


  ngOnInit(): void {
    this.getAllSubjects(); 
  }

  ngOnDestroy(){
    console.log("subject component is dead");
  }

  getAllSubjects(){
    this.subjectSerivice.getAllSubjects().subscribe(result=>{
      console.log(result);
      this.subjects = result; 
      if(this.subjects!=undefined){ 
      this.dataSource = new MatTableDataSource(this.subjects);
    }
    },
    error=>{console.log(error);}
    );
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } 

  detailPage(subject: Subject){
    alert("clicked");
    this.router.navigateByUrl(`subjects/detail/${subject.id}`);
}

 


}
