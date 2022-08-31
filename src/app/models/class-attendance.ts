import { Professor } from "./professor";
import { Student } from "./student";
import { Subject } from "./subject";

export class ClassAttendance {
    professor!: Professor;
    subject!: Subject;
    classStudents!: Student[];
    date!: Date;
}