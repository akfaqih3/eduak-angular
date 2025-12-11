import { Observable } from 'rxjs';
import { CourseModel } from '../models/course.model';
import { ListResponse, SingleResponse } from '../../core';

export abstract class CourseDataSource {
  abstract getCourses(): Observable<ListResponse<CourseModel>>;
  abstract getCourse(id: number): Observable<SingleResponse<CourseModel>>;
}
