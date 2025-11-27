import { Injectable, inject } from '@angular/core';
import { CourseRepository } from '../../repositories/course.repository';
import { CourseEntity } from '../../entities/course.entity';

@Injectable({
  providedIn: 'root',
})
export class GetCourseUseCase {
  private repository = inject(CourseRepository);

  execute(id: number): Promise<CourseEntity> {
    return this.repository.getCourse(id);
  }
}
