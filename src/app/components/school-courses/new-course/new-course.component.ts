import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss']
})
export class NewCourseComponent implements OnInit {

  course: Course={
      courseName:''
  };

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit(): void {
  }


  onSubmit(){
    this.addNewCourse();
  }

  addNewCourse(){
    this.courseService.addCourse(this.course).subscribe(
      (course)=>{
        console.log(`successfully added course: ${course}`)
        this.router.navigateByUrl('/courses');
      },
      error=>{
        console.log(`failed to add course: ${error}`);
        this.router.navigateByUrl('/courses');
      }
    )
  }

  cancelEditing(){
    console.log(`Editing operation cancelled`);
    this.router.navigateByUrl(`/courses`);
  }
}
