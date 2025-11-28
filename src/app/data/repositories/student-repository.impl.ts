import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentRepository } from '../../domain/repositories/student.repository';
import { StudentDataSource } from '../datasources/student.datasource';
import { CourseEntity } from '../../domain/entities/course.entity';
import { CourseMapper } from '../models/course.model';
import { Result } from '../../core/result/result';
import { DomainError } from '../../core/errors/domain-error';
import { ErrorMapper } from '../../core/result/error-mapper';

@Injectable({
    providedIn: 'root',
})
export class StudentRepositoryImpl implements StudentRepository {
    private dataSource = inject(StudentDataSource);

    async getEnrolledCourses(): Promise<Result<CourseEntity[], DomainError>> {
        try {
            const result = await firstValueFrom(
                this.dataSource.getEnrolledCourses().pipe(map((courses) => courses.map(CourseMapper.toDomain)))
            );
            return Result.success(result);
        } catch (error) {
            return Result.failure(ErrorMapper.fromError(error));
        }
    }

    async getEnrolledCourse(id: number): Promise<Result<CourseEntity, DomainError>> {
        try {
            const result = await firstValueFrom(
                this.dataSource.getEnrolledCourse(id).pipe(map(CourseMapper.toDomain))
            );
            return Result.success(result);
        } catch (error) {
            return Result.failure(ErrorMapper.fromError(error));
        }
    }
}
