import { Injectable, inject } from '@angular/core';
import { TeacherRepository } from '../../repositories/teacher.repository';
import { CourseEntity } from '../../entities/course.entity';

@Injectable({
  providedIn: 'root',
})
export class GetTeacherCourseUseCase {
  private repository = inject(TeacherRepository);

  execute(id: number): Promise<CourseEntity> {
    return this.repository.getCourse(id);
  }
}
