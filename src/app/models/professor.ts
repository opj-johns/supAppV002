import { Subject } from "./subject";

export class Professor { 
    id?: number;
    firstName: string = "";
    lastName: string = "";  
    email: string = "";
    phone: string = "";
    subjectsTaught?: Subject[]=[]; 
}  