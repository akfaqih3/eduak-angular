import { ListResponse } from './../../core/api/models/api-response.model';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseRepository } from '../../domain/repositories/course.repository';
import { CourseEntity } from '../../domain/entities/course.entity';
import { CourseDataSource } from '../datasources/course.datasource';
import { CourseMapper } from '../models/course.model';
import { Result } from '../../core/result/result';
import { DomainError } from '../../core/errors/domain-error';
import { ErrorMapper } from '../../core/result/error-mapper';
import { response } from 'express';

export class CourseRepositoryImpl implements CourseRepository {

  constructor(private dataSource: CourseDataSource) {}

  async getCourses(): Promise<Result<CourseEntity[], DomainError>> {
    try {
      const result = await firstValueFrom(
        this.dataSource.getCourses().pipe(
          map(response => response.data),
        )
      );
      return Result.success(result);
    } catch (error) {
      return Result.failure(ErrorMapper.fromError(error));
    }
  }

  async getCourse(id: number): Promise<Result<CourseEntity, DomainError>> {
    try {
      const result = await firstValueFrom(
        this.dataSource.getCourse(id).pipe(
          map(response => response.data),
        )
      );
      return Result.success(result);
    } catch (error) {
      return Result.failure(ErrorMapper.fromError(error));
    }
  }
}
