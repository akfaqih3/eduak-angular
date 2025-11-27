import { Injectable, inject } from '@angular/core';
import { SubjectRepository } from '../../repositories/subject.repository';
import { SubjectEntity } from '../../entities/subject.entity';

@Injectable({
  providedIn: 'root',
})
export class GetSubjectUseCase {
  private repository = inject(SubjectRepository);

  execute(slug: string): Promise<SubjectEntity> {
    return this.repository.getSubject(slug);
  }
}
