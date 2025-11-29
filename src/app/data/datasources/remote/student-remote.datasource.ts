import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentDataSource } from '../student.datasource';
import { CourseModel } from '../../models/course.model';
import { BaseApiService } from '../../../core/api/services/base-api.service';
import { ListResponse, SingleResponse } from '../../../core/api/models';
import { API_RESOURCES, STUDENT_ENDPOINTS } from '../../../core/constants/api-endpoints';

@Injectable({
    providedIn: 'root'
})
export class StudentRemoteDataSource extends BaseApiService<any> implements StudentDataSource {
    protected resourcePath = API_RESOURCES.STUDENTS;

    getEnrolledCourses(): Observable<CourseModel[]> {
        return this.get<ListResponse<CourseModel>>(STUDENT_ENDPOINTS.ENROLLED_COURSES).pipe(map(response => response.data));
    }

    getEnrolledCourse(id: number): Observable<CourseModel> {
        return this.get<SingleResponse<CourseModel>>(STUDENT_ENDPOINTS.ENROLL(id)).pipe(map(response => response.data));
    }
}
