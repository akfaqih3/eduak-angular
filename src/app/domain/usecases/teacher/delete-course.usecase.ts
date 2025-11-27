import { Injectable, inject } from '@angular/core';
import { TeacherRepository } from '../../repositories/teacher.repository';
import { Result } from '../../../core/result/result';
import { DomainError } from '../../../core/errors/domain-error';

@Injectable({
  providedIn: 'root',
})
export class DeleteCourseUseCase {
  private repository = inject(TeacherRepository);

  execute(id: number): Promise<Result<void, DomainError>> {
    return this.repository.deleteCourse(id);
  }
}
