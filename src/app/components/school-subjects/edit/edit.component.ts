import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.service';
import { Subject } from '../../../models/subject'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  subject!: Subject;
  subjectId!: number;

  constructor(private subjectService: SubjectService, private activatedRoute: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.subjectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getSubject();
  }


  getSubject(){
   
    this.subjectService.getSubject(this.subjectId).subscribe(subject=>{
      console.log('retreived subject for editing succesfully', subject);
      this.subject = subject;
    },
    error=>{
      console.log('error retreiving subject for editing', error);
    });
  }

  updateSubject(){
    this.subjectService.updateSubject(this.subject).subscribe(subject=>{
      console.log('updated subject successfully', subject);
      this.router.navigateByUrl(`/subjects/${this.subject.id}`);
    },
    error=>{
      console.log('error updating subject', error);
      this.router.navigateByUrl(`/subjects/${this.subject.id}`);
    }) 
  }

  onSubmit(){
    this.updateSubject();
  }
}
