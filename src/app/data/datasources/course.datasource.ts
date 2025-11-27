import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseModel } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export abstract class CourseDataSource {
  abstract getCourses(): Observable<CourseModel[]>;
  abstract getCourse(id: number): Observable<CourseModel>;
}
