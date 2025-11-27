import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseDataSource } from '../course.datasource';
import { CourseModel } from '../../models/course.model';
import { API_ENDPOINTS } from '../../../core/constants';

@Injectable({
  providedIn: 'root',
})
export class CourseRemoteDataSource implements CourseDataSource {
  private http = inject(HttpClient);

  getCourses(): Observable<CourseModel[]> {
    return this.http.get<CourseModel[]>(API_ENDPOINTS.COURSE.BASE);
  }

  getCourse(id: number): Observable<CourseModel> {
    return this.http.get<CourseModel>(API_ENDPOINTS.COURSE.BY_ID(id));
  }
}
