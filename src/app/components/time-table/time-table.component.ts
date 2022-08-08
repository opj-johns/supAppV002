import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassIdentifier } from 'src/app/models/class-identifier';
import { Course } from 'src/app/models/course';
import { TimeTableService } from 'src/app/services/time-table.service';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})
export class TimeTableComponent implements OnInit {

  items = ['First year', 'Second year', 'Third year ', 'Fourth year ', 'Fifth year'];
  expandedIndex = 0;
  timetableIds!: Set<ClassIdentifier>;
  createdTBCourses: Array<Array<Course>>=[];
  firstYearCourses: Course[]=[];
  secondYearCourses: Course[]=[];
  thirdYearCourses: Course[]=[];
  fouthYearCourses: Course[]=[];
  fifthYearCourses: Course[]=[];
  constructor(private router:Router,
              private TimaTableService: TimeTableService) { }


  ngOnInit(): void {
    this.fetchSavedTimetableIds();
  }

  groupTimeTableIdsByLevel(){
       console.log(`Timetable Ids`,this.timetableIds);
        this.timetableIds.forEach(tbId => {
             let levelId = tbId.level.id;
            switch(levelId){
              case 1: 
                 this.firstYearCourses.push(tbId.course);
                 break;
              case 2: 
                 this.secondYearCourses.push(tbId.course);
                 break;
              case 3: 
                 this.thirdYearCourses.push(tbId.course);
                 break;
              case 4:
                 this.fouthYearCourses.push(tbId.course);
                 break;
              case 5:
                this.fifthYearCourses.push(tbId.course);
            }
        });
        this.createdTBCourses[0]= this.firstYearCourses;
        this.createdTBCourses[1]= this.secondYearCourses;
        this.createdTBCourses[2]= this.thirdYearCourses;
        this.createdTBCourses[3]= this.fouthYearCourses;
        this.createdTBCourses[4]= this.fifthYearCourses;
        console.log(this.createdTBCourses);
  }


  updateTimeTable(){
    localStorage.setItem('action','update');
     this.router.navigate(['timetable/create/sheet/18/5'], {
      state:{ action:'update'}
     })

  }

  fetchSavedTimetableIds(){
     this.TimaTableService.getSavedTImeTableIds().subscribe({
      next:(resp)=>{
        this.timetableIds = resp;
       this.groupTimeTableIdsByLevel();   
      },
      error:(err)=>{
        console.log(`Error fetching timetable Ids`, err);
      }
     })
  }

 
}
