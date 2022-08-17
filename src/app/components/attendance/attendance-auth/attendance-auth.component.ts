import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-attendance-auth',
  templateUrl: './attendance-auth.component.html',
  styleUrls: ['./attendance-auth.component.scss']
})
export class AttendanceAuthComponent implements OnInit {
  
   password!: string;

  constructor(public dialogRef: MatDialogRef<AttendanceAuthComponent>) { }

  ngOnInit(): void {
  }

  onVerify(){

    this.dialogRef.close(this.password);

  }

}
