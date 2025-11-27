import { CourseEntity } from '../entities/course.entity';
import { Result } from '../../core/result/result';
import { DomainError } from '../../core/errors/domain-error';

export abstract class TeacherRepository {

    abstract getCourses(): Promise<Result<CourseEntity[], DomainError>>;

    abstract getCourse(id: number): Promise<Result<CourseEntity, DomainError>>;

    abstract createCourse(course: CourseEntity): Promise<Result<CourseEntity, DomainError>>;

    abstract updateCourse(course: CourseEntity): Promise<Result<CourseEntity, DomainError>>;

    abstract deleteCourse(id: number): Promise<Result<void, DomainError>>;
}