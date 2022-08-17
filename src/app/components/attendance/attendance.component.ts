import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreatedWeeklyAttendanceList } from 'src/app/models/created-weekly-attendance-list';
import { AttendanceService } from 'src/app/services/attendance.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { AttendanceAuthComponent } from './attendance-auth/attendance-auth.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
 
  createdWeeklyAttendances!: CreatedWeeklyAttendanceList;

  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  expandedIndex = 0;
  collectedPwd!: string;
  
  constructor(public dialog: MatDialog, private professorService: ProfessorService, 
    private router: Router, private AttendanceService: AttendanceService) { }

  ngOnInit(): void {
   this.getAllCreatedWeeklyAttendace()
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


  getAllCreatedWeeklyAttendace(){
    this.AttendanceService.fetchWeeklyCreatedAttendances().subscribe({
      next:(resp)=>{
          this.createdWeeklyAttendances = resp;
          console.log(`successfully fetched fetchWeeklyCreatedAttendances: `, this.createdWeeklyAttendances);
      },
      error:(err)=>{
          console.log(`Error fetching created weekly attendances`, err);
      }
    })
  }

}
