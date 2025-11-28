import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentDataSource } from '../student.datasource';
import { CourseModel } from '../../models/course.model';
import { BaseApiService } from '../../../core/api/services/base-api.service';
import { ListResponse, SingleResponse } from '../../../core/api/models';
import { UrlBuilder } from '../../../core';

@Injectable({
    providedIn: 'root'
})
export class StudentRemoteDataSource extends BaseApiService<any> implements StudentDataSource {
    protected resourcePath = 'students/courses';

    getEnrolledCourses(): Observable<CourseModel[]> {
        return this.get<ListResponse<CourseModel>>('enrolled').pipe(map(response => response.data));
    }

    getEnrolledCourse(id: number): Observable<CourseModel> {
        let _path = UrlBuilder.build('{id}/enroll', { id: id });
        return this.get<SingleResponse<CourseModel>>(`courses/${id}`).pipe(map(response => response.data));
    }
}
