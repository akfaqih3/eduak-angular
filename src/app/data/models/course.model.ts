import { CourseEntity } from '../../domain/entities/course.entity';

export interface CourseModel {
  id: number;
  overview: string;
  photo?: string;
  subject: string;
  title: string;
}

export class CourseMapper {
  static toDomain(model: CourseModel): CourseEntity {
    return {
      id: model.id,
      overview: model.overview,
      photo: model.photo,
      subject: model.subject,
      title: model.title,
    };
  }

  static toModel(entity: CourseEntity): CourseModel {
    return {
      id: entity.id,
      overview: entity.overview,
      photo: entity.photo,
      subject: entity.subject,
      title: entity.title,
    };
  }
}
