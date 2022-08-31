import { Course } from "./course";
import { Level } from "./level";
import { Month, Week } from "./weekly-attendance-identifier";

export class WeeklyAttendance{
    course!: Course;
    level!: Level;
    startDate!: Date;
    endDate!: Date;
    week!: Week;
    month!:Month;
}