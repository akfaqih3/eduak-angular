import { CourseEntity } from '../entities/course.entity';
import { Result } from '../../core/result/result';
import { DomainError } from '../../core/errors/domain-error';

export abstract class CourseRepository {

    abstract getCourses(): Promise<Result<CourseEntity[], DomainError>>;

    abstract getCourse(id: number): Promise<Result<CourseEntity, DomainError>>;
}
