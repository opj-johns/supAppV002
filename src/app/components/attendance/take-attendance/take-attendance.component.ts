import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Level } from 'src/app/models/level';
import { Professor } from 'src/app/models/professor';
import { CourseService } from 'src/app/services/course.service';
import { LevelService } from 'src/app/services/level.service';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-take-attendance',
  templateUrl: './take-attendance.component.html',
  styleUrls: ['./take-attendance.component.scss']
})
export class TakeAttendanceComponent implements OnInit {

  @ViewChild('takeAttendanceForm') takeAttendanceForm!: NgForm;
  
  selectedCourseID!: number;
  selectedProfessorID!: number;
  selectedLevelID!: number;
  selectedCourse!: Course;
  selectedProfessor!: Professor;
  selectedLevel!: Level;
  professor!: Professor;
  selectedSubjectId!:number;
  professorId!:number;
  professors: Professor[]=[];
  courses: Course[] = [];
  levels: Level[]=[];

  constructor(private professorService: ProfessorService,
              private courseService: CourseService,
              private levelService: LevelService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let id = Number(this.activatedRoute.snapshot.paramMap.get('profId'))
    if(id!==NaN){
      this.professorId = id;
    }else{
      console.log(`Could not convert profId from route param into number`);
    }
    this.fetctProfessor();
    this.fetchCourses();
    this.fetchLevels();
  }


  
  goToAttendanceSheet(){
  if(this.selectedLevelID!== undefined&&
     this.selectedCourseID!== undefined&&
     this.selectedSubjectId!==undefined){
      this.router.navigateByUrl(`attendance/sheet/${this.professorId}/${this.selectedCourseID}/${this.selectedLevelID}/${this.selectedSubjectId}`);
     }else{
       console.log(`unsatisfied route parameters for attendance sheet page`);
       alert("Please select all the fields to proceed");
     }
  
  // console.log(this.takeAttendanceForm.value);
  // console.log(`selectedCourseID`,this.selectedCourseID);
  // console.log(`selectedProfessorID`,this.selectedProfessorID);
  // console.log(`selectedLevelID`,this.selectedLevelID);
  }

  
  fetctProfessor(){
    this.professorService.getProfessor(this.professorId).subscribe({
      next:(resp)=>{
        this.professor = resp;
        console.log(`fetched prof for take attendance page`, resp);
      },
      error:(err)=>{console.log(`Error fetching prof for take attendance page`, err);
    }
    })
  }


  fetchCourses(){
    this.courseService.getAllCoures().subscribe({
      next: (respCourses)=>{
        this.courses = respCourses;
        console.log(`successfully fetched all courses for take attendance page`, respCourses);
      },
       error: (err) =>{
         console.log(`Failed to fetch courses for take attendance page`, err);
      }
    })
  }

  fetchLevels(){
    this.levelService.getSchoolLevels().subscribe({
      next: (respLevels)=>{
        this.levels = respLevels;
        console.log(`successfully fetched all levels for take attendance page`, respLevels);
      },
       error: (err) =>{
         console.log(`Failed to fetch levels for take attendance page`, err);
      }
    })
  }  


}
