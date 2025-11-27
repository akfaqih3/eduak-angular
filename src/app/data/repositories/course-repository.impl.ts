import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseRepository } from '../../domain/repositories/course.repository';
import { CourseEntity } from '../../domain/entities/course.entity';
import { CourseDataSource } from '../datasources/course.datasource';
import { CourseMapper } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseRepositoryImpl implements CourseRepository {
  private dataSource = inject(CourseDataSource);

  async getCourses(): Promise<CourseEntity[]> {
    return firstValueFrom(
      this.dataSource.getCourses().pipe(map((courses) => courses.map(CourseMapper.toDomain)))
    );
  }

  async getCourse(id: number): Promise<CourseEntity> {
    return firstValueFrom(
      this.dataSource.getCourse(id).pipe(map(CourseMapper.toDomain))
    );
  }
}
