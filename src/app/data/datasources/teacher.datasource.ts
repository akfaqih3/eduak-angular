import { Observable } from 'rxjs';
import { CourseModel } from '../models/course.model';

export abstract class TeacherDataSource {
    abstract getCourses(): Observable<CourseModel[]>;
    abstract getCourse(id: number): Observable<CourseModel>;
    abstract createCourse(course: CourseModel): Observable<CourseModel>;
    abstract updateCourse(course: CourseModel): Observable<CourseModel>;
    abstract deleteCourse(id: number): Observable<void>;
}
