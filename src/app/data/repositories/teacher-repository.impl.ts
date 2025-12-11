import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeacherRepository } from '../../domain/repositories/teacher.repository';
import { TeacherDataSource } from '../datasources/teacher.datasource';
import { CourseEntity } from '../../domain/entities/course.entity';
import { CourseMapper } from '../models/course.model';
import { Result } from '../../core/result/result';
import { DomainError } from '../../core/errors/domain-error';
import { ErrorMapper } from '../../core/result/error-mapper';

export class TeacherRepositoryImpl implements TeacherRepository {

    constructor(private dataSource: TeacherDataSource) {}

    async getCourses(): Promise<Result<CourseEntity[], DomainError>> {
        try {
            const result = await firstValueFrom(
                this.dataSource.getCourses().pipe(map((courses) => courses.map(CourseMapper.toDomain)))
            );
            return Result.success(result);
        } catch (error) {
            return Result.failure(ErrorMapper.fromError(error));
        }
    }

    async getCourse(id: number): Promise<Result<CourseEntity, DomainError>> {
        try {
            const result = await firstValueFrom(
                this.dataSource.getCourse(id).pipe(map(CourseMapper.toDomain))
            );
            return Result.success(result);
        } catch (error) {
            return Result.failure(ErrorMapper.fromError(error));
        }
    }

    async createCourse(course: CourseEntity): Promise<Result<CourseEntity, DomainError>> {
        try {
            const model = CourseMapper.toModel(course);
            const result = await firstValueFrom(
                this.dataSource.createCourse(model).pipe(map(CourseMapper.toDomain))
            );
            return Result.success(result);
        } catch (error) {
            return Result.failure(ErrorMapper.fromError(error));
        }
    }

    async updateCourse(course: CourseEntity): Promise<Result<CourseEntity, DomainError>> {
        try {
            const model = CourseMapper.toModel(course);
            const result = await firstValueFrom(
                this.dataSource.updateCourse(model).pipe(map(CourseMapper.toDomain))
            );
            return Result.success(result);
        } catch (error) {
            return Result.failure(ErrorMapper.fromError(error));
        }
    }

    async deleteCourse(id: number): Promise<Result<void, DomainError>> {
        try {
            const result = await firstValueFrom(this.dataSource.deleteCourse(id));
            return Result.success(result);
        } catch (error) {
            return Result.failure(ErrorMapper.fromError(error));
        }
    }
}
