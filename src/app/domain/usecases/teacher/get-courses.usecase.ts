import { Injectable, inject } from '@angular/core';
import { TeacherRepository } from '../../repositories/teacher.repository';
import { CourseEntity } from '../../entities/course.entity';

@Injectable({
  providedIn: 'root',
})
export class GetTeacherCoursesUseCase {
  private repository = inject(TeacherRepository);

  execute(): Promise<CourseEntity[]> {
    return this.repository.getCourses();
  }
}
