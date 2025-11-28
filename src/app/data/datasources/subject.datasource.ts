import { Observable } from 'rxjs';
import { SubjectModel } from '../models/subject.model';

export abstract class SubjectDataSource {
    abstract getSubjects(): Observable<SubjectModel[]>;
    abstract getSubject(slug: string): Observable<SubjectModel>;
}
