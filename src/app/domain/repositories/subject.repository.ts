import { SubjectEntity } from '../entities/subject.entity';
import { Result } from '../../core/result/result';
import { DomainError } from '../../core/errors/domain-error';

export abstract class SubjectRepository {

    abstract getSubjects(): Promise<Result<SubjectEntity[], DomainError>>;

    abstract getSubject(slug: string): Promise<Result<SubjectEntity, DomainError>>;
}