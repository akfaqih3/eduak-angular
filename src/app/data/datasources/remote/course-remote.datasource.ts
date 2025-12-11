import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseDataSource } from '../course.datasource';
import { CourseModel, CoursesApiResponse } from '../../models/course.model';
import { BaseApiService } from '../../../core/api/services/base-api.service';
import { API_RESOURCES } from '../../../core/constants/api-endpoints';
import { HttpOptionsBuilder, ListResponse, SingleResponse } from '../../../core';
import { CourseMapper } from '../../models/course.model';

export class CourseRemoteDataSource extends BaseApiService<CourseModel> implements CourseDataSource {
  protected resourcePath = API_RESOURCES.COURSES;

  getCourses(): Observable<ListResponse<CourseModel>> {
    return this.getAll();
  }

  getCourse(id: number): Observable<SingleResponse<CourseModel>> {
      return this.getById(id);
    }

  override getAll(params?: Record<string, any>): Observable<ListResponse<CourseModel>> {
      const url = this.getResourceUrl();
      const options = params
          ? HttpOptionsBuilder.create().setParams(params).build()
          : {};

      return this.http.get<CoursesApiResponse>(url, { ...options, observe: 'body', responseType: 'json' }).pipe(
        map(response => CourseMapper.toListResponse(response))
      );
  }

  override getById(id: number): Observable<SingleResponse<CourseModel>> {
    const url = this.getResourceUrl(id.toString());

    return this.http.get<CourseModel>(url).pipe(
      map(response => {
        return CourseMapper.toSingleResponse(response);
      }),

    );
  }

}
