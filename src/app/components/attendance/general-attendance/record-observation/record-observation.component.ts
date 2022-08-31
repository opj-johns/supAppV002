import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Month } from 'src/app/models/weekly-attendance-identifier';
import { MonthService } from 'src/app/services/month.service';

@Component({
  selector: 'app-record-observation',
  templateUrl: './record-observation.component.html',
  styleUrls: ['./record-observation.component.scss']
})
export class RecordObservationComponent implements OnInit {

  authorisedAbsents!: number;
  observation!: string;
  selectedMonthIndex!: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private monthService: MonthService,
  public dialogRef: MatDialogRef<RecordObservationComponent>) { }

  ngOnInit(): void {
  }

  
    returnData(){
      let sMonthIndex = Number(this.selectedMonthIndex);
       
      let data = {monthIndex: sMonthIndex, observ: this.observation, authAbsents: this.authorisedAbsents}

      this.dialogRef.close(data);
    }

    cancel(){
      this.dialogRef.close(null)
    }

}
