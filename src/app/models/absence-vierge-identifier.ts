import { Course } from "./course";
import { Level } from "./level";
import { Semester } from "./weekly-attendance-identifier";

export class AbsenceViergeIdentifier {
    absenceViergeIdentifierId!: AbsenceViergeIdentifierId;
    semester!: Semester;
    level!: Level;
    course!: Course;
}

interface AbsenceViergeIdentifierId{
    courseId: number;
    semesterId: number;
    levelId: number;
}