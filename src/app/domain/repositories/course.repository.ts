import { CourseEntity } from '../entities/course.entity';

export abstract class CourseRepository {

    abstract getCourses(): Promise<CourseEntity[]>;

    abstract getCourse(id: number): Promise<CourseEntity>;
}
