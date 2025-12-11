import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeacherDataSource } from '../teacher.datasource';
import { CourseModel } from '../../models/course.model';
import { BaseApiService } from '../../../core/api/services/base-api.service';
import { ApiResponse, ListResponse, SingleResponse } from '../../../core/api/models';
import { API_RESOURCES, TEACHER_ENDPOINTS } from '../../../core';

export class TeacherRemoteDataSource extends BaseApiService<any> implements TeacherDataSource {
    protected resourcePath = API_RESOURCES.TEACHERS;

    getCourses(): Observable<CourseModel[]> {
        return this.get<ListResponse<CourseModel>>(TEACHER_ENDPOINTS.COURSES).pipe(map(response => response.data));
    }

    getCourse(id: number): Observable<CourseModel> {
        return this.get<SingleResponse<CourseModel>>(TEACHER_ENDPOINTS.COURSE_DETAIL(id)).pipe(map(response => response.data));
    }

    createCourse(course: CourseModel): Observable<CourseModel> {
        return this.post<SingleResponse<CourseModel>>(TEACHER_ENDPOINTS.CREATE_COURSE, course).pipe(map(response => response.data));
    }

    updateCourse(course: CourseModel): Observable<CourseModel> {
        return this.put<SingleResponse<CourseModel>>(TEACHER_ENDPOINTS.UPDATE_COURSE(course.id), course).pipe(map(response => response.data));
    }

    deleteCourse(id: number): Observable<void> {
        return this.deleteRequest<ApiResponse<void>>(TEACHER_ENDPOINTS.DELETE_COURSE(id)).pipe(map(() => void 0));
    }
}
