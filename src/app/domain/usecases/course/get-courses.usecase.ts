import { Injectable, inject } from '@angular/core';
import { CourseRepository } from '../../repositories/course.repository';
import { CourseEntity } from '../../entities/course.entity';

@Injectable({
  providedIn: 'root',
})
export class GetCoursesUseCase {
  private repository = inject(CourseRepository);

  execute(): Promise<CourseEntity[]> {
    return this.repository.getCourses();
  }
}
