import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SubjectDataSource } from '../subject.datasource';
import { SubjectModel } from '../../models/subject.model';

@Injectable({
    providedIn: 'root'
})
export class SubjectRemoteDataSource extends SubjectDataSource {

    // TODO: Inject HttpClient here when available
    // constructor(private http: HttpClient) { super(); }

    getSubjects(): Observable<SubjectModel[]> {
        // Mock implementation
        return of([
            {
                slug: 'angular',
                title: 'Angular',
                photo: 'https://angular.io/assets/images/logos/angular/angular.png'
            },
            {
                slug: 'react',
                title: 'React',
                photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'
            }
        ]);
    }

    getSubject(slug: string): Observable<SubjectModel> {
        return of({
            slug: slug,
            title: 'Angular',
            photo: 'https://angular.io/assets/images/logos/angular/angular.png'
        });
    }
}
