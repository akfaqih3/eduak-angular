import { Injectable, inject } from '@angular/core';
import { TeacherRepository } from '../../repositories/teacher.repository';
import { CourseEntity } from '../../entities/course.entity';

@Injectable({
  providedIn: 'root',
})
export class CreateCourseUseCase {
  private repository = inject(TeacherRepository);

  execute(course: CourseEntity): Promise<CourseEntity> {
    return this.repository.createCourse(course);
  }
}
