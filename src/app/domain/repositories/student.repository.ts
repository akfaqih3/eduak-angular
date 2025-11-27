import { CourseEntity } from "../entities/course.entity";
import { Result } from '../../core/result/result';
import { DomainError } from '../../core/errors/domain-error';

export abstract class StudentRepository {

    abstract getEnrolledCourses(): Promise<Result<CourseEntity[], DomainError>>;

    abstract getEnrolledCourse(id: number): Promise<Result<CourseEntity, DomainError>>;
}
