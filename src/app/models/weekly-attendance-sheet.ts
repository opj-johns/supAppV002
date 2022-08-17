import { Student } from "./student";
import { Subject } from "./subject";
import { WeeklyAttendanceIdentifier } from "./weekly-attendance-identifier";

export class WeeklyAttendanceSheet{
    subjects!: Subject[];
    rows!: Row[];
    weeklyAttendanceIdentifier!: WeeklyAttendanceIdentifier;
}

interface Row{
    student: Student;
    states: number[];
}