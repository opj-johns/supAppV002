import { Professor } from "./professor";
import { Student } from "./student";
import { Subject } from "./subject";

export class Attendance{
    id?: number;
    professor!: Professor;
    subject!: Subject;
    student!: Student
}