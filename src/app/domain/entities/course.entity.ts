/**
 * Course
 */
export interface CourseEntity {
    created: Date;
    id: number;
    overview: string;
    owner: string;
    photo?: string;
    subject: string;
    title: string;
    total_modules: number;
    total_students: number;
    [property: string]: any;
}