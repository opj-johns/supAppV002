import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-school-courses',
  templateUrl: './school-courses.component.html',
  styleUrls: ['./school-courses.component.scss']
})
export class SchoolCoursesComponent implements OnInit {

   courses: Course[] = [];

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit(): void {
    this.getCourses();
  }

  // is demanding data from course service 
  getCourses(){
    this.courseService.getAllCoures().subscribe(courses => {
      console.log(courses);
      this.courses = courses;
    },
    error=>{
      console.log(error);
    }
    )
  }


  addCourse(){
    
  }

  editCoursePage(courseId: number | undefined){
    if(courseId !== undefined){
      this.router.navigateByUrl(`/courses/edit/${courseId}`);
    }else{
      console.log(`courseId is undefined while opening edit course page: ${courseId}`);
    }
  }

}
