import { Course } from "./course";
import { Level } from "./level";

export class Student{
    id: number=0; 
    mat: string='';  
    firstName:string='';  
    lastName: string = ''; 
    gender: string=''; 
    email: string =''; 
    phone: string=''; 
    course!:Course; 
    level!:Level;   
}