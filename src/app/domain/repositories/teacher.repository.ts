import { CourseEntity } from '../entities/course.entity';

export abstract class TeacherRepository {


    abstract getCourses(): Promise<CourseEntity[]>;

    abstract getCourse(id: number): Promise<CourseEntity>;

    abstract createCourse(course: CourseEntity): Promise<CourseEntity>;

    abstract updateCourse(course: CourseEntity): Promise<CourseEntity>;

    abstract deleteCourse(id: number): Promise<any>;
}