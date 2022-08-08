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
  selector: 'app-view-new-edit',
  templateUrl: './view-new-edit.component.html',
  styleUrls: ['./view-new-edit.component.scss']
})
export class ViewNewEditComponent implements OnInit {

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
  filledGrids: number[]=[];

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
   
    this.levelId = Number(this.activatedRoute.snapshot.paramMap.get('levelId'));
    this.courseId = Number(this.activatedRoute.snapshot.paramMap.get('courseId'));
    let action = this.activatedRoute.snapshot.paramMap.get('action');
    if(action === 'view') {this.view =true; this.levelId = this.levelId+1}
    if(action === 'new') this.view = false;
    if(action === 'edit') this.view = false;
    if(this.courseId===undefined || this.levelId===undefined){console.log('undefined params')} ;
    
    
    this.initializeCourse();
    this.initializeLevel();
    this.initializeProfessors();
    this.initializeSubjects();
    this.initializeClassrooms();
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
      `course is undefined`
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

  initializeSubjects(){
     let course= new Course();
     course.id = this.courseId;
     let level = new Level();
     level.id = this.levelId;
     this.classSubjectsService.fetchClassSsubjects(course, level).subscribe({
      next:(resp)=>{
        this.subjects = resp;
        console.log(this.subjects);
         
      },
      error:(err)=>{
        console.log(`Error fetching subjects for time table sheet `, err);
      }
     })
  }

  initializeClassrooms(){
      this.classroomService.fetchClassrooms().subscribe({
        next:(resp)=>{
          this.classrooms = resp;
          console.log(`fetched classrooms:`, this.classrooms);
        },
        error:(err)=>{
          console.log(`Failed to initialize classrooms:`, err);
        }
      })
  }

  initializeProfessors(){
    this.professorService.getAllProfessors().subscribe({
      next:(resp)=>{
        this.professors = resp;
        console.log(resp);
      },
      error:(err)=>{
        console.log(`Error fetching professors for time table sheet page`, err);
      }
    })
  }

  onSubjectSelected(form: NgForm){
    
    // enable professor select and classroom select
    this.enableProfessorSelect();
     
  
     // initialize displayed professors 
     this.initializeDisplayedProfessors();
     this.ensbleClassroomSelect();

     // the selectedPosition minus one is the index where we must store on the timetableaList  
     // set the times and days at this index on the timeableList array
     this.startTime = new TBStartTime();
     this.endTime = new TBEndTime();
     this.day= new TBDay();
     console.log(`Type of selected position:`,typeof(this.selectedPosition));
     console.log(`selected postion:`, this.selectedPosition);
     
     switch(this.selectedPosition){
      case '1':
      case '5':
      case '9':
      case '13':
      case '17':
        console.log(`witch case`)
        this.startTime.id = 1;
        this.startTime.time = "8H30";
        this.endTime.id = 1;
        this.endTime.time = "10H00";
        
        break;
      case '2':
      case '6':
      case '10':
      case '14':
      case '18':
        console.log(`witch case`)
        this.startTime.id = 2;
        this.startTime.time = "10H15";
        this.endTime.id = 2;
        this.endTime.time = "11H45";
        
        break;
       case '3':
      case '7':
      case '11':
      case '15':
      case '19':
        console.log(`witch case`)
        this.startTime.id = 3;
        this.startTime.time = "14H00";
        this.endTime.id = 3;
        this.endTime.time = "15H30";
        break;
      case '4':
      case '8':
      case '12':
      case '16':
      case '20':
        console.log(`witch case`)
        this.startTime.id = 4;
        this.startTime.time = "15H45";
        this.endTime.id = 4;
        this.endTime.time = "17H15";
        break;
     }

     switch(this.selectedPosition){
      case '1':
      case '2':
      case '3':
      case '4':
        console.log(`witch case`)
        this.day.id=1;
        this.day.day = "LUNDI";        
        break;
      case '5':
      case '6':
      case '7':
      case '8':
        console.log(`witch case`)
        this.day.id=2;
        this.day.day = "MARDI";        
        break;
      case '9':
      case '10':
      case '11':
      case '12':
       this.day.id = 3;
       this.day.day = "MERCREDI"
        break;
      case '13':
      case '14':
      case '15':
      case '16':
        console.log(`witch case`)
        this.day.id = 4;
       this.day.day = "JEUDI"
        break;
      case '17':
      case '18':
      case '19':
      case '20':
        console.log(`witch case`)
        this.day.id = 5;
        this.day.day = "VENDREDI"
        break;
     }
     
     // initialize displayed classrooms 
     this.initializeDisplayedClassrooms(this.day, this.startTime, this.endTime);
  }

  enableProfessorSelect(){
         this.professorSelectTag.nativeElement.disabled = false;
  }
  ensbleClassroomSelect(){
        this.classroomSelectTag.nativeElement.disabled = false;
  }
  initializeDisplayedClassrooms(day: TBDay, 
                                startTime:TBStartTime, 
                                endTime: TBEndTime){
        
        this.timeTableService.checkClassroomStatus(day, startTime, endTime).subscribe({
                  next:(resp)=>{
                    this.displayedClassrooms = [...this.classrooms];
                      console.log(`resp`,resp);
                      console.log(`displayed classrooms`, this.displayedClassrooms);
                      
                      if(resp!==null){  
                         
                        resp.forEach(occupiedClassroom=>{
                        let index=  this.displayedClassrooms.findIndex(
                            (classroom) => classroom.id === occupiedClassroom.id
                            )
                          console.log(`index`,index);
                          this.displayedClassrooms.splice(index,1);
                          console.log(`After splice`, this.displayedClassrooms);
                        })       
                        
                         
                      }
                      
                  },
                  error:(err)=>{
                    console.log(`failed to check classroom status`, err);
                  }
        });
  }    

  
  onPostionChange(){
    // select subject 
    this.enableSubjectSelect();
    this.enableDeleteButton();
  }
  enableSubjectSelect(){
   this.subejctSelectTag.nativeElement.disabled = false;
  }
  enableDeleteButton(){
   this.deleteButton.nativeElement.disabled = false;
  }
  enableAddButton(){
    this.addButton.nativeElement.disabled = false;
  }

  disableAddButton(){
     this.addButton.nativeElement.disabled = true;
  }

   initializeDisplayedProfessors(){
    // clear exisiting subjects
      this.displayedProfessors = [];
      let subject: Subject | undefined;
    let subjectId  = Number(this.selectedSubjectId);
    // find subject from subjects array
    if(subjectId!==undefined){
       subject = this.subjects.find(s=>s.id===subjectId);

        // for  subject search each of professor's subjectsTaught
    // if subjectsTaught has subject, add professor to displayedProfessors 
       this.professors.forEach(p=>{
        p.subjectsTaught?.forEach(s=>{
        if(s.id===subjectId){
           this.displayedProfessors.push(p);
        }
       })
    });

    }

   
 
   }


   onAddButtonClicked(form:NgForm){
      let timeTable = new TimeTable();
      
      
      let subjectId = Number(this.selectedSubjectId);
      if(subjectId!==undefined){
        let foundSubject = this.subjects.find(sub => sub.id === subjectId);
        if(foundSubject!==undefined){ timeTable.subject = foundSubject};
      }

      let professorId = Number(this.selectedProfessorId);
       if(professorId!==undefined){
        console.log("Professor id to be searched for", professorId);
        console.log("displayed profs", this.displayedProfessors);
       let foundProf =  this.displayedProfessors.find(prof => prof.id === professorId);
       if (foundProf!==undefined){ 
        timeTable.professor = foundProf}else{ alert("undefined professor search result")};
      }

      let classroomId = Number(this.selectedClassroomId);
      if(classroomId!==undefined){
       let foundClassroom = this.displayedClassrooms.find(room => room.id === classroomId);
       if(foundClassroom!==undefined){ timeTable.classroom = foundClassroom};
      }

      timeTable.day=this.day;
      timeTable.startTime = this.startTime;
      timeTable.endTime = this.endTime;
      timeTable.course = this.course;
      timeTable.level = this.level;
      let position = Number(this.selectedPosition);
      timeTable.gridPosition = position;
      // before you add a grid position to this, check that it does not exist already;
      let exisitingPosition = this.filledGrids.find(x=> x === position);
      if(exisitingPosition===undefined){this.filledGrids.push(position); }
      
      this.noData[position-1]= false;
      this.timeTableList[position-1] = timeTable;
      form.reset();
      // disable all select inputs and the buttons
      this.deleteButton.nativeElement.disabled = true;
       this.addButton.nativeElement.disabled = true;
      this.subejctSelectTag.nativeElement.disabled = true;
       this.professorSelectTag.nativeElement.disabled = true;
       this.classroomSelectTag.nativeElement.disabled = true;
     console.log(`Time table list`,this.timeTableList);
  }  

  
  

   onDeleteButtonClick(){
    if(confirm(`Are you sure you want to delete data from position ${this.selectedPosition}?`)){
      let position = Number(this.selectedPosition);
      let existingPostionsIndex = this.gridPositions.findIndex(p=> p=== position);
      if(existingPostionsIndex!==-1){
        this.filledGrids.splice(existingPostionsIndex, 1);
      }
      this.noData[position-1] = true;
      this.timeTableList[position-1] = new TimeTable();
    }
  }

  onUpdateButtonClicked(){
     this.view = false;
  }

  onSaveButtonClicked(){
      let timetables: TimeTable[]=[];
     
      console.log(`filled grids`, this.filledGrids);
      
      this.filledGrids.forEach(grid=>{
        timetables.push(this.timeTableList[grid-1]);
      })
      
    console.log(`Ready to ship timetables`,timetables);
     console.log(`ready to save timetable:`, timetables);
     this.timeTableService.saveNewTimeTableRecord(timetables).subscribe({
      next:(resp)=>{
          alert('successfully save timetable');
          console.log(resp);
          this.view=true;
      },
      error:(err)=>{
        console.log(`Failed to save timetable:`, err);
      }
     })
    }
}
