import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute  } from '@angular/router'; 
import { Subject } from 'src/app/models/subject';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit {

  subject: Subject= new Subject();
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private subjectService: SubjectService) { } 

  ngOnInit(): void {
    this.subject.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log('hello'); 
    this.getSubject();
  }
  
  getSubject(){ 
    if(this.subject.id !== undefined){
      this.subjectService.getSubject(this.subject.id).subscribe(subject=>{
        this.subject = subject;
        console.log('retreived subject =', this.subject);
      },error=>{console.log('error retreiving subject', error)})
    }else{
      console.log("could not extract id para from subject/detail/:id route");
    }
  }

  showSubjects(){
   this.router.navigateByUrl('subjects'); 
  }

  goToEditPage(){
    this.router.navigateByUrl(`subjects/edit/${this.subject.id}`);
    console.log('edit button is clicked');
  }

  deleteSubject(){
    if(this.subject.id!== undefined)  {
      this.subjectService.deleteSubject(this.subject.id).subscribe(res=>{
        console.log('response from deleting subject', this.subject, 'is ', res);
        this.showSubjects();
      },
      error=>{
        console.log('error from deleting subject', this.subject,'error: ', error);
        this.showSubjects();
      })
    }
  }
  
}
