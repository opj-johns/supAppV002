import { Course } from "./course";
import { Level } from "./level";
import { Semester } from "./weekly-attendance-identifier";

export interface CreatedWeeklyAttendanceList{
      levels: ALLevel[];
}

interface ALLevel{
    level: Level;
    courses: ALCourse[];
}

interface ALCourse{
    course: Course;
    months: ALMonth[];
}

interface ALMonth{
     month: Month;
     weeks: Week[];
}

interface Month{
    id: number;
    signature: string;
    semester: Semester;
}

interface Week{
    id: number;
    signature: string;
}