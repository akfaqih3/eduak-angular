import { Injectable, inject } from '@angular/core';
import { CourseRepository } from '../../repositories/course.repository';
import { CourseEntity } from '../../entities/course.entity';
import { Result } from '../../../core/result/result';
import { DomainError } from '../../../core/errors/domain-error';

@Injectable({
  providedIn: 'root',
})
export class GetCoursesUseCase {
  private repository = inject(CourseRepository);

  execute(): Promise<Result<CourseEntity[], DomainError>> {
    return this.repository.getCourses();
  }
}
