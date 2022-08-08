import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Level } from '../../../models/level';
import { LevelService } from '../../../services/level.service'


@Component({
  selector: 'app-edit-level',
  templateUrl: './edit-level.component.html',
  styleUrls: ['./edit-level.component.scss']
})
export class EditLevelComponent implements OnInit {

  updateLevel: Level = new Level();
  @Output() doneEditing: EventEmitter<any> = new EventEmitter();
  levels: Level[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public level: Level, 
              private dialogRef: MatDialogRef<EditLevelComponent>,
              private levelService: LevelService) { } 

  ngOnInit(): void {
    this.updateLevel.id = this.level.id;
    this.updateLevel.levelName = this.level.levelName;
  }

  saveLevel(){
    // save the level 
     this.levelService.updateLevel(this.updateLevel).subscribe(level =>
      {
        console.log("saved level: ")
        console.log(level);
        this.level.id=level.id; 
        this.level.levelName = level.levelName;
      })
    
    // close the dialogue
     this.dialogRef.close();  
  }

}
