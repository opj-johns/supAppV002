import { Course } from "./course";
import { Level } from "./level";
import { Student } from "./student";
import { Month, Semester, Week } from "./weekly-attendance-identifier";

export class AbsenceVierge{
    course!: Course;
    level!: Level;
    student!: Student;
    semester!: Semester;
    month!: Month;
    week!: Week;
    numberOfAbsents!: number;
}