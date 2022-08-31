import { Course } from "./course";
import { Level } from "./level";
import { Semester } from "./weekly-attendance-identifier";

export class AbsenceViergeIdResponse{
     levels!: AVLevel[];
}



interface AVLevel{
    level: Level;
    semesters: AVSemester[]
}



interface AVSemester{
    semester: Semester;
    courses: Set<Course>;
}