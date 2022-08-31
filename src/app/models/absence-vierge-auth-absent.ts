import { Course } from "./course";
import { Level } from "./level";
import { Student } from "./student";
import { Month, Semester } from "./weekly-attendance-identifier";

export class AbsentViergeAuthAbsent{
    course!: Course;
    level!: Level;
    student!: Student;
    semester!: Semester;
    month!: Month;
    authorizedAbsents: number=0;
    remark: string='';
}