import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {


  course: Course= {
    courseName: ''
  }

  constructor(private courseService: CourseService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
   this.getCourse();
  }

  getCourse(){
    let courseId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    if(courseId !== undefined){
      this.courseService.fetchCourse(courseId).subscribe(course=>{
        this.course = course;
        console.log(`successfully retreived course ${course} for update`);
      }, 
      error=>{
        console.log(`Error retreiving course for update: ${error}`);
      })
    }
  }



  onSubmit(){
    this.updateCourse();
  }

  updateCourse(){
    this.courseService.updateCourse(this.course).subscribe(course=>{
      console.log(`successfully updated course from ${this.course} to ${course}`);
      this.router.navigateByUrl(`/courses`);
    },
    error=>{
      console.log(`Error updating course: ${error}`);
      this.router.navigateByUrl(`/courses`);
    })
  }

  cancelEditing(){
    console.log(`Editing operation cancelled`);
    this.router.navigateByUrl(`/courses`);
  }

}
