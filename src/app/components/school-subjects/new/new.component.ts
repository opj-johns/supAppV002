import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/models/subject';
import { Router } from '@angular/router'
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {



  
  subject: Subject = {
    subjectName: ''
  }
  
  constructor(private route:Router, private subjectService: SubjectService) { }
  
  ngOnInit(): void {
  }
  
  onSubmit() { 
   
    this.saveSubject();

  }

  saveSubject(){
    this.subjectService.addNewSubject(this.subject).subscribe(subject=>{
      console.log('subject added successfully')
      console.log(subject);
      this.route.navigateByUrl('/subjects');
    },
    error=>{
      console.log('an error occurred');
      console.log(error);
      this.route.navigateByUrl('/subjects');
    });
  }
}
