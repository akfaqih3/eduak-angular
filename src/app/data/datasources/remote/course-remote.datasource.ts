import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseDataSource } from '../course.datasource';
import { CourseModel } from '../../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseRemoteDataSource implements CourseDataSource {
  private http = inject(HttpClient);
  private apiUrl = '/api/courses';

  getCourses(): Observable<CourseModel[]> {
    return this.http.get<CourseModel[]>(this.apiUrl);
  }

  getCourse(id: number): Observable<CourseModel> {
    return this.http.get<CourseModel>(`${this.apiUrl}/${id}`);
  }
}
