import { Observable } from 'rxjs';
import { CourseModel } from '../models/course.model';

export abstract class StudentDataSource {
    abstract getEnrolledCourses(): Observable<CourseModel[]>;
    abstract getEnrolledCourse(id: number): Observable<CourseModel>;
}
