import { SubjectEntity } from '../entities/subject.entity';

export abstract class SubjectRepository {

    abstract getSubjects(): Promise<SubjectEntity[]>;

    abstract getSubject(slug: string): Promise<SubjectEntity>;
}