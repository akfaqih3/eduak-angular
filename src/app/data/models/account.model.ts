import { AccountEntity, RoleEnum } from '../../domain/entities/account.entity';

export interface AccountModel {
  bio: string;
  email: string;
  name?: string | null;
  phone?: string | null;
  photo: string;
  role?: RoleEnum;
}

export class AccountMapper {
  static toDomain(model: AccountModel): AccountEntity {
    return {
      bio: model.bio,
      email: model.email,
      name: model.name,
      phone: model.phone,
      photo: model.photo,
      role: model.role,
    };
  }

  static toModel(entity: AccountEntity): AccountModel {
    return {
      bio: entity.bio,
      email: entity.email,
      name: entity.name,
      phone: entity.phone,
      photo: entity.photo,
      role: entity.role,
    };
  }
}
