import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubjectDataSource } from '../subject.datasource';
import { SubjectModel } from '../../models/subject.model';
import { BaseApiService } from '../../../core/api/services/base-api.service';

@Injectable({
    providedIn: 'root'
})
export class SubjectRemoteDataSource extends BaseApiService<SubjectModel> implements SubjectDataSource {
    protected resourcePath = 'subjects';

    getSubjects(): Observable<SubjectModel[]> {
        return this.getAll().pipe(map(response => response.data));
    }

    getSubject(slug: string): Observable<SubjectModel> {
        return this.getById(slug).pipe(map(response => response.data));
    }
}
