import { Subject } from "./subject";
import { Level } from "./level";
import { Professor } from "./professor";
import { Classroom } from "./classroom";
import { TBDay } from "./tb-day";
import { TBStartTime } from "./tb-start-time";
import { TBEndTime } from "./TBEndTime";
import { Course } from "./course";

export class TimeTable {
    timeTableId!: TimeTableId;
    subject: Subject=new Subject();
    level!: Level;
    professor: Professor= new Professor();
    classroom: Classroom= new Classroom;
    day!: TBDay;
    startTime!: TBStartTime;
    endTime!: TBEndTime;
    course!: Course;
    gridPosition!: number;
}


interface TimeTableId{
    courseId: number;
    levelId: number;
    subjectId: number;
    professorId:number;
    classroomId:number;
    startTimeId:number;
    endTimeId:number;
}