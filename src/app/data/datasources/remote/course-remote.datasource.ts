import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseDataSource } from '../course.datasource';
import { CourseModel } from '../../models/course.model';
import { BaseApiService } from '../../../core/api/services/base-api.service';
import { API_RESOURCES } from '../../../core/constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class CourseRemoteDataSource extends BaseApiService<CourseModel> implements CourseDataSource {
  protected resourcePath = API_RESOURCES.COURSES;

  getCourses(): Observable<CourseModel[]> {
    return this.getAll().pipe(map((response) => response.data));
  }

  getCourse(id: number): Observable<CourseModel> {
    return this.getById(id).pipe(map((response) => response.data));
  }
}
