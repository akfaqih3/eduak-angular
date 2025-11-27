import { Injectable, inject } from '@angular/core';
import { StudentRepository } from '../../repositories/student.repository';
import { CourseEntity } from '../../entities/course.entity';

@Injectable({
  providedIn: 'root',
})
export class GetEnrolledCourseUseCase {
  private repository = inject(StudentRepository);

  execute(id: number): Promise<CourseEntity> {
    return this.repository.getEnrolledCourse(id);
  }
}
