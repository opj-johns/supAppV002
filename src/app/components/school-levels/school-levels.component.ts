import { Component, OnInit } from '@angular/core';
import {LevelService} from '../../services/level.service';
import {Level } from '../../models/level';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { EditLevelComponent } from './edit-level/edit-level.component'

@Component({
  selector: 'app-school-levels',
  templateUrl: './school-levels.component.html',
  styleUrls: ['./school-levels.component.scss']
})
export class SchoolLevelsComponent implements OnInit {

   
  levels: Level[] =[];
  

  constructor(private levelService: LevelService, public matDialogue: MatDialog) { }

  ngOnInit(): void {
    this.fetchLevels();
  }

   fetchLevels(){
    console.log("fetching from backend")
    this.levelService.getSchoolLevels().subscribe(
      levels =>{
        this.levels = levels;
        console.log(levels);
      },
      error =>{
        console.error(`Response = ${error} `);
      }
    )
  }

  openDialog(level: Level): void {
    console.log("Level to be updated");
    console.log(level);

    const dialogRef = this.matDialogue.open(EditLevelComponent,
         {data: level, 
          height: '230px',
          width: '600px',
           }
          );  } 

  refreshLevels(){
    this.fetchLevels();scrollbars
  }
        
      
    
}
