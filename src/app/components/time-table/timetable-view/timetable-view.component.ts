import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Classroom } from 'src/app/models/classroom';
import { Course } from 'src/app/models/course';
import { Level } from 'src/app/models/level';
import { Professor } from 'src/app/models/professor';
import { Subject } from 'src/app/models/subject';
import { TBDay } from 'src/app/models/tb-day';
import { TBStartTime } from 'src/app/models/tb-start-time';
import { TBEndTime } from 'src/app/models/TBEndTime';
import { TimeTable } from 'src/app/models/time-table';
import { ClassSubjectService } from 'src/app/services/class-subject.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { CourseService } from 'src/app/services/course.service';
import { LevelService } from 'src/app/services/level.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { TimeTableService } from 'src/app/services/time-table.service';

@Component({
  selector: 'app-timetable-view',
  templateUrl: './timetable-view.component.html',
  styleUrls: ['./timetable-view.component.scss']
})
export class TimetableViewComponent implements OnInit {
   
  @ViewChild('subjectSelect') subejctSelectTag!: ElementRef;
  @ViewChild('professorSelect') professorSelectTag!: ElementRef;
  @ViewChild('classroomSelect') classroomSelectTag!: ElementRef;
  @ViewChild('deleteButton') deleteButton!:ElementRef;
  @ViewChild('addButton') addButton!:ElementRef;

  noData = [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,];
  level!:Level;
  course!:Course;
  courseId:number=18;
  levelId:number=5;
  gridPositions: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  
  selectedSubjectId!:string;
  selectedProfessorId!:string;
  selectedClassroomId!:string;
  selectedPosition!:string;
  startTime!:TBStartTime;
  endTime!:TBEndTime;
  day!:TBDay;

  subjects!: Subject[];
  professors!: Professor[];
  classrooms!: Classroom[];
  timeTableList: TimeTable[]=[];

  displayedProfessors!:Professor[];
  displayedClassrooms!: Classroom[];
  
   view:boolean = true; 

   

  constructor(private courseService: CourseService,
              private levelService: LevelService,
              private activatedRoute: ActivatedRoute,
              private timeTableService: TimeTableService,
              private classSubjectsService: ClassSubjectService,
              private classroomService: ClassroomService,
              private professorService: ProfessorService) { }

  ngOnInit(): void {
     this.initializeCourse();
    this.initializeLevel();
    // this.initializeProfessors();
    // this.initializeSubjects();
    // this.initializeClassrooms();
    this.fetchClassTimetable();
  }



    createTimeTableList(){
  
    for(let i=0; i<20; i++){
      this.timeTableList.push(new TimeTable);
    }
    console.log(this.timeTableList);
  }

   initializeCourse(){
    if(this.courseId !== undefined){
      this.courseService.fetchCourse(this.courseId).subscribe(course=>{
        this.course = course;
        console.log(`course`, course);
      }, 
      error=>{
        console.log(`Error retreiving course for update: ${error}`);
      })
    }
  }

  initializeLevel(){
    if(this.levelId!==undefined){
      this.levelService.fetchLevel(this.levelId).subscribe({
        next:(resp)=>{
          this.level = resp;
          console.log(`level`, resp);
        },
        error:(err)=>{
          console.log(`Error fetcing course for time table sheet page`, err);
        }
      })
    }else{
      `level is undefined`
    }

  }

   fetchClassTimetable(){
    
    console.log(`Do some update operation`);
    // fetch class time table and assign each to their corresponding postions in timetableList 

    let course = new Course();
    course.id=this.courseId;
    let level = new Level();
    level.id = this.levelId;

    this.timeTableService.getClassTimetable(course,level).subscribe({
      next:(resp)=>{
           resp.forEach(timetable=>{
             let index = timetable.gridPosition-1;
             this.noData[index]=false; 
             this.timeTableList[index] = timetable;
             console.log(`Class timetable:`, resp);
             console.log(`Time table list`,this.timeTableList);
           });
      },
      error:(err)=>{ console.log(`Error fetching class time table`,err)}
    })

  }


   onUpdateButtonClicked(){
     
  }

  onSaveButtonClicked(){
      let timetables: TimeTable[]=[];
     this.timeTableList.forEach(timetable=> {
      if(timetable.professor.firstName!==''){
        timetables.push(timetable);
      }
     });
     console.log(`ready to save timetable:`, timetables);
     this.timeTableService.saveNewTimeTableRecord(timetables).subscribe({
      next:(resp)=>{
          alert('successfully save timetable');
          console.log(resp);
      },
      error:(err)=>{
        console.log(`Failed to save timetable:`, err);
      }
     })
    }


}
