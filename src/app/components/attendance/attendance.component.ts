import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfessorService } from 'src/app/services/professor.service';
import { AttendanceAuthComponent } from './attendance-auth/attendance-auth.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
 
  
  toggleDisplay: boolean = true;

  
  collectedPwd!: string;
  
  constructor(public dialog: MatDialog, private professorService: ProfessorService, private router: Router
    ) { }

  ngOnInit(): void {
  
  }

  toggleDisplayedComponent(){
    this.toggleDisplay = !this.toggleDisplay;
  }
  

  openAuthDialog(){

     let dialogRef= this.dialog.open(AttendanceAuthComponent, {
          width:'500px',
          height:'300px',
          position: { top: '150px', left:'600px'},
          autoFocus: true,
          hasBackdrop:true
       });

    dialogRef.afterClosed().subscribe({
      next:(result)=>{
        this.collectedPwd = result;
        console.log(`entered password :`, result);
        this.verifyPasswordFromBackend(result);
      },
      error:(err)=>{console.log(`could not get password`, err)}
    })
       
  }

  // return either professor of null 
   verifyPasswordFromBackend(password: string){
    if(password.length===0) return;
    this.professorService.getProfessorByPassword(password).subscribe({
      next:(prof)=>{
         console.log(`Fetched prof from api`, prof);
         if(prof === null){
          alert(`Incorrect password. Please check and try again`);
          return;
         }
         this.router.navigateByUrl(`attendance/take/${prof.id}`)
      },
      error:(err)=>{console.log(`Error fetching prof with password:`, password)}
    })
  }


  

}
