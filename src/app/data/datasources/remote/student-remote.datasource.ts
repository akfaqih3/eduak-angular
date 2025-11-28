import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentDataSource } from '../student.datasource';
import { CourseModel } from '../../models/course.model';
import { BaseApiService } from '../../../core/api/services/base-api.service';
import { ListResponse, SingleResponse } from '../../../core/api/models';

@Injectable({
    providedIn: 'root'
})
export class StudentRemoteDataSource extends BaseApiService<any> implements StudentDataSource {
    protected resourcePath = 'student';

    getEnrolledCourses(): Observable<CourseModel[]> {
        return this.get<ListResponse<CourseModel>>('courses').pipe(map(response => response.data));
    }

    getEnrolledCourse(id: number): Observable<CourseModel> {
        return this.get<SingleResponse<CourseModel>>(`courses/${id}`).pipe(map(response => response.data));
    }
}
