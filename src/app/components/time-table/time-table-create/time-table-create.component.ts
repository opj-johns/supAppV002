import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Level } from 'src/app/models/level';
import { Subject } from 'src/app/models/subject';
import { ClassSubjectService } from 'src/app/services/class-subject.service';
import { CourseService } from 'src/app/services/course.service';
import { LevelService } from 'src/app/services/level.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-time-table-create',
  templateUrl: './time-table-create.component.html',
  styleUrls: ['./time-table-create.component.scss']
})
export class TimeTableCreateComponent implements OnInit {

  courses: Course[]=[];
  levels: Level[]=[];
  subjects: Subject[]=[];
  selectedCourseId: number=0;
  selectedLevelId:number=0;
  selectedSubjects: Subject[]=[];

  selectedCourse!: Course;
  selectedLevel!:Level;


   savedSuccessfully: boolean=false;

   displayedColumns: string[] = ['subjectName'];
   dataSource!: MatTableDataSource<Subject>;   


    @ViewChild('paginator', {static: true}) paginator: MatPaginator | undefined; 
    @ViewChild(MatSort) sort!: MatSort;


  constructor(private courseService: CourseService,
              private levelService: LevelService,
              private subjectService: SubjectService,
              private activatedRoute: ActivatedRoute,
              private classSubjectsService: ClassSubjectService,
              private router: Router) { }

  ngOnInit(): void {

  
     this.fetchSubejects();
    this.fetchCourses();
    this.fetchLevels();
  }

  fetchCourses(){
    this.courseService.getAllCoures().subscribe({
      next: (respCourses)=>{
        this.courses = respCourses;
      },
      error:(err)=>{
        console.log(`Error fetching courses for create time table page`,err);
      }
    })
  }

  fetchLevels(){
    this.levelService.getSchoolLevels().subscribe({
      next:(respLevels)=>{
        this.levels= respLevels;
      },
      error:(err)=>{
        console.log(`Error fetching levels for create time table page`, err);
      }
    })
  }

  fetchSubejects(){
    this.subjectService.getAllSubjects().subscribe({
      next: (respSubjects)=>{
        this.subjects = respSubjects
        if(this.subjects!=undefined){ 
        this.dataSource = new MatTableDataSource(this.subjects);
        }
        if(this.paginator !== undefined){
          this.dataSource.paginator = this.paginator;
        }else{
          console.log("paginator is undefined for professor edit page", this.paginator);
        }
      },
      error: (err)=>{
        console.log(`Error fetching subjects for create time table page`, err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } 

  addToSelectedSubjects(subject: Subject){
   // if this subject is not selected already, add it to selected subject

   let existingSubject = this.selectedSubjects.find(s => s.id === subject.id);

   if(existingSubject===undefined){
     this.selectedSubjects.push(subject);
   }
   
   
  }

  removeSubject(subject: Subject){
    let index: number = this.selectedSubjects.findIndex(s=>s.id===subject.id);
    console.log(index);
    this.selectedSubjects.splice(index,1);
    console.log(subject);
  }

  saveClassSubjects(){

    this.assignCourseAndLevel();

    if(this.selectedCourse === undefined){
      alert("Please select a course");
      return;
    }
    if(this.selectedLevel===undefined){
      alert("Please select a level");
      return;
    }
    if(this.selectedSubjects.length<3){
      console.log("Please select a least three subjects");
    }


    this.classSubjectsService.saveClassSubjects(this.selectedCourse, this.selectedLevel, this.selectedSubjects).subscribe({
      next: (resp)=>{
        this.savedSuccessfully= true;
        alert("Saved class subjects successfully! Click on NEXT to proceed");
        console.log(resp);
      },
      error:(err)=>{
        console.log("Failed to save class subjects", err);
      }
    })


  }

  assignCourseAndLevel(){
   
   let course2 = this.courses.find(course=> course.id == this.selectedCourseId);

    if(course2!==undefined){
      this.selectedCourse = course2;
    }

    let level2 = this.levels.find(level=> level.id==this.selectedLevelId);
    if(level2!== undefined){
      this.selectedLevel = level2;
    }
  }

  goToTimeTableSheet(){
    this.router.navigateByUrl(`/timetable/view_edit_new/${this.selectedCourseId}/${this.selectedLevelId}/new`);
  }
}
