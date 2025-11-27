/**
 * Subject
 */
export interface SubjectEntity {
    photo?: string;
    slug: string;
    title: string;
    total_courses: number;
    [property: string]: any;
}