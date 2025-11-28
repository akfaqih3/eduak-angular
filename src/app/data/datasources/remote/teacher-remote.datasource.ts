import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeacherDataSource } from '../teacher.datasource';
import { CourseModel } from '../../models/course.model';
import { BaseApiService } from '../../../core/api/services/base-api.service';
import { ApiResponse, ListResponse, SingleResponse } from '../../../core/api/models';
import { UrlBuilder } from '../../../core';

@Injectable({
    providedIn: 'root'
})
export class TeacherRemoteDataSource extends BaseApiService<any> implements TeacherDataSource {
    protected resourcePath = UrlBuilder.join('teachers', 'courses');

    getCourses(): Observable<CourseModel[]> {
        return this.getAll().pipe(map(response => response.data));
    }

    getCourse(id: number): Observable<CourseModel> {
        let _path = UrlBuilder.build('{id}', { id: id });
        return this.get<SingleResponse<CourseModel>>(_path).pipe(map(response => response.data));
    }

    createCourse(course: CourseModel): Observable<CourseModel> {
        return this.post<SingleResponse<CourseModel>>('create', course).pipe(map(response => response.data));
    }

    updateCourse(course: CourseModel): Observable<CourseModel> {
        let _path = UrlBuilder.build('{id}/update', { id: course.id });
        return this.put<SingleResponse<CourseModel>>(`courses/${course.id}`, course).pipe(map(response => response.data));
    }

    deleteCourse(id: number): Observable<void> {
        let _path = UrlBuilder.build('{id}/delete', { id: id });
        return this.deleteRequest<ApiResponse<void>>(`courses/${id}`).pipe(map(() => void 0));
    }
}
