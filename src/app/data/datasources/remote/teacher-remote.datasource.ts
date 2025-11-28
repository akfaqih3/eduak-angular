import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TeacherDataSource } from '../teacher.datasource';
import { CourseModel } from '../../models/course.model';

@Injectable({
    providedIn: 'root'
})
export class TeacherRemoteDataSource extends TeacherDataSource {

    // TODO: Inject HttpClient here when available
    // constructor(private http: HttpClient) { super(); }

    getCourses(): Observable<CourseModel[]> {
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

    getCourse(id: number): Observable<CourseModel> {
        return of({
            id: id,
            title: 'Introduction to Angular',
            overview: 'Learn the basics of Angular',
            photo: 'https://angular.io/assets/images/logos/angular/angular.png',
            subject: 'Angular'
        });
    }

    createCourse(course: CourseModel): Observable<CourseModel> {
        return of({
            ...course,
            id: Math.floor(Math.random() * 1000)
        });
    }

    updateCourse(course: CourseModel): Observable<CourseModel> {
        return of(course);
    }

    deleteCourse(id: number): Observable<void> {
        return of(void 0);
    }
}
