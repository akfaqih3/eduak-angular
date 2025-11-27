/**
 * Account
 */
export interface AccountEntity {
    bio: string;
    email: string;
    name?: null | string;
    phone?: null | string;
    photo: string;
    role?: RoleEnum;
    [property: string]: any;
}

/**
 * RoleEnum, * `teacher` - Teacher
 * * `student` - Student
 */
export enum RoleEnum {
    Student = "student",
    Teacher = "teacher",
}