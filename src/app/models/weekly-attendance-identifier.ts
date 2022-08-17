import { ClassIdentifier } from "./class-identifier";

export class WeeklyAttendanceIdentifier{
    classIdentifier!: ClassIdentifier;
    startDate!: Date;
    endDate!: Date;
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
}