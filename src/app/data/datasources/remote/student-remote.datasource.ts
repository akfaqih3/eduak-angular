import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StudentDataSource } from '../student.datasource';
import { CourseModel } from '../../models/course.model';

@Injectable({
    providedIn: 'root'
})
export class StudentRemoteDataSource extends StudentDataSource {

    // TODO: Inject HttpClient here when available
    // constructor(private http: HttpClient) { super(); }

    getEnrolledCourses(): Observable<CourseModel[]> {
        // Mock implementation
        return of([
            {
                id: 1,
                title: 'Introduction to Angular',
                overview: 'Learn the basics of Angular',
                photo: 'https://angular.io/assets/images/logos/angular/angular.png',
                subject: 'Angular'
            }
        ]);
    }

    getEnrolledCourse(id: number): Observable<CourseModel> {
        return of({
            id: id,
            title: 'Introduction to Angular',
            overview: 'Learn the basics of Angular',
            photo: 'https://angular.io/assets/images/logos/angular/angular.png',
            subject: 'Angular'
        });
    }
}
