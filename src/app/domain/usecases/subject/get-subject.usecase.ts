import { Injectable, inject } from '@angular/core';
import { SubjectRepository } from '../../repositories/subject.repository';
import { SubjectEntity } from '../../entities/subject.entity';
import { Result } from '../../../core/result/result';
import { DomainError } from '../../../core/errors/domain-error';

@Injectable({
  providedIn: 'root',
})
export class GetSubjectUseCase {
  private repository = inject(SubjectRepository);

  execute(slug: string): Promise<Result<SubjectEntity, DomainError>> {
    return this.repository.getSubject(slug);
  }
}
