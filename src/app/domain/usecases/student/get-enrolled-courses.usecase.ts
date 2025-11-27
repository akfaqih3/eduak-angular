import { Injectable, inject } from '@angular/core';
import { StudentRepository } from '../../repositories/student.repository';
import { CourseEntity } from '../../entities/course.entity';

@Injectable({
  providedIn: 'root',
})
export class GetEnrolledCoursesUseCase {
  private repository = inject(StudentRepository);

  execute(): Promise<CourseEntity[]> {
    return this.repository.getEnrolledCourses();
  }
}
