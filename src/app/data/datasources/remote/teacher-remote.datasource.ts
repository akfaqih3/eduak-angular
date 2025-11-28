import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeacherDataSource } from '../teacher.datasource';
import { CourseModel } from '../../models/course.model';
import { BaseApiService } from '../../../core/api/services/base-api.service';
import { ApiResponse, ListResponse, SingleResponse } from '../../../core/api/models';

@Injectable({
    providedIn: 'root'
})
export class TeacherRemoteDataSource extends BaseApiService<any> implements TeacherDataSource {
    protected resourcePath = 'teacher';

    getCourses(): Observable<CourseModel[]> {
        return this.get<ListResponse<CourseModel>>('courses').pipe(map(response => response.data));
    }

    getCourse(id: number): Observable<CourseModel> {
        return this.get<SingleResponse<CourseModel>>(`courses/${id}`).pipe(map(response => response.data));
    }

    createCourse(course: CourseModel): Observable<CourseModel> {
        return this.post<SingleResponse<CourseModel>>('courses', course).pipe(map(response => response.data));
    }

    updateCourse(course: CourseModel): Observable<CourseModel> {
        return this.put<SingleResponse<CourseModel>>(`courses/${course.id}`, course).pipe(map(response => response.data));
    }

    deleteCourse(id: number): Observable<void> {
        return this.deleteRequest<ApiResponse<void>>(`courses/${id}`).pipe(map(() => void 0));
    }
}
