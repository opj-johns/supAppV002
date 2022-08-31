import { ClassIdentifier } from "./class-identifier";
import { Course } from "./course";
import { Level } from "./level";

export class WeeklyAttendanceIdentifier{
    classIdentifier!: ClassIdentifier;
    startDate: Date = new Date(0,0,0);
    endDate: Date= new Date(0,0,0);
    week!: Week;
    month!:Month;
}

export class Week{
    id!:number;
    signature!: string;
}

export class Month{
    id!:number;
    signature!: string;
    semester!: Semester;
}

export class Semester{
    id!: number;
    semester!: string;
}

export class DateFormat{
    date!: number;
    month!: number;
    year!: number;
}