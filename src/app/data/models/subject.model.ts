import { SubjectEntity } from '../../domain/entities/subject.entity';

export interface SubjectModel {
    photo?: string;
    slug: string;
    title: string;
    [property: string]: any;
}

export class SubjectMapper {
    static toDomain(model: SubjectModel): SubjectEntity {
        return {
            photo: model.photo,
            slug: model.slug,
            title: model.title,
        };
    }

    static toModel(entity: SubjectEntity): SubjectModel {
        return {
            photo: entity.photo,
            slug: entity.slug,
            title: entity.title,
        };
    }
}
