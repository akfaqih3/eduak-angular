import { Injectable, inject } from '@angular/core';
import { StudentRepository } from '../../repositories/student.repository';
import { CourseEntity } from '../../entities/course.entity';
import { Result } from '../../../core/result/result';
import { DomainError } from '../../../core/errors/domain-error';

@Injectable({
  providedIn: 'root',
})
export class GetEnrolledCoursesUseCase {
  private repository = inject(StudentRepository);

  execute(): Promise<Result<CourseEntity[], DomainError>> {
    return this.repository.getEnrolledCourses();
  }
}
