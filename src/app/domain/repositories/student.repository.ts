import { CourseEntity } from "../entities/course.entity";

export abstract class StudentRepository {

    abstract getEnrolledCourses(): Promise<CourseEntity[]>;

    abstract getEnrolledCourse(id: number): Promise<CourseEntity>;
}
