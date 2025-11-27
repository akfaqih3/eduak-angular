import { Injectable, inject } from '@angular/core';
import { SubjectRepository } from '../../repositories/subject.repository';
import { SubjectEntity } from '../../entities/subject.entity';

@Injectable({
  providedIn: 'root',
})
export class GetSubjectsUseCase {
  private repository = inject(SubjectRepository);

  execute(): Promise<SubjectEntity[]> {
    return this.repository.getSubjects();
  }
}
