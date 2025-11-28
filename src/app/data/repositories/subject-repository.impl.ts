import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubjectRepository } from '../../domain/repositories/subject.repository';
import { SubjectDataSource } from '../datasources/subject.datasource';
import { SubjectEntity } from '../../domain/entities/subject.entity';
import { SubjectMapper } from '../models/subject.model';
import { Result } from '../../core/result/result';
import { DomainError } from '../../core/errors/domain-error';
import { ErrorMapper } from '../../core/result/error-mapper';

@Injectable({
    providedIn: 'root',
})
export class SubjectRepositoryImpl implements SubjectRepository {
    private dataSource = inject(SubjectDataSource);

    async getSubjects(): Promise<Result<SubjectEntity[], DomainError>> {
        try {
            const result = await firstValueFrom(
                this.dataSource.getSubjects().pipe(map((subjects) => subjects.map(SubjectMapper.toDomain)))
            );
            return Result.success(result);
        } catch (error) {
            return Result.failure(ErrorMapper.fromError(error));
        }
    }

    async getSubject(slug: string): Promise<Result<SubjectEntity, DomainError>> {
        try {
            const result = await firstValueFrom(
                this.dataSource.getSubject(slug).pipe(map(SubjectMapper.toDomain))
            );
            return Result.success(result);
        } catch (error) {
            return Result.failure(ErrorMapper.fromError(error));
        }
    }
}
