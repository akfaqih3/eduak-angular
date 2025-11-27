import { Injectable, inject } from '@angular/core';
import { TeacherRepository } from '../../repositories/teacher.repository';
import { CourseEntity } from '../../entities/course.entity';
import { Result } from '../../../core/result/result';
import { DomainError } from '../../../core/errors/domain-error';

@Injectable({
  providedIn: 'root',
})
export class GetTeacherCourseUseCase {
  private repository = inject(TeacherRepository);

  execute(id: number): Promise<Result<CourseEntity, DomainError>> {
    return this.repository.getCourse(id);
  }
}
