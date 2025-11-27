import { Injectable, inject } from '@angular/core';
import { TeacherRepository } from '../../repositories/teacher.repository';

@Injectable({
  providedIn: 'root',
})
export class DeleteCourseUseCase {
  private repository = inject(TeacherRepository);

  execute(id: number): Promise<any> {
    return this.repository.deleteCourse(id);
  }
}
