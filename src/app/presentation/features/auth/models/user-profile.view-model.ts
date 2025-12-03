import { AccountEntity, RoleEnum } from '../../../../domain/entities/account.entity';

/**
 * UserProfileViewModel
 * ViewModel for displaying user profile information in the UI
 */
export interface UserProfileViewModel {
  email: string;
  name: string;
  phone: string | null;
  photo: string;
  bio: string;
  role: RoleEnum;
  displayRole: string;
  isTeacher: boolean;
  isStudent: boolean;
}

/**
 * Mapper function to convert AccountEntity to UserProfileViewModel
 */
export function toUserProfileViewModel(account: AccountEntity): UserProfileViewModel {
  const displayRole = account.role === RoleEnum.Teacher ? 'معلم' : 'طالب';
  
  return {
    email: account.email,
    name: account.name || 'مستخدم',
    phone: account.phone || null,
    photo: account.photo || '/assets/default-avatar.png',
    bio: account.bio || '',
    role: account.role || RoleEnum.Student,
    displayRole,
    isTeacher: account.role === RoleEnum.Teacher,
    isStudent: account.role === RoleEnum.Student,
  };
}
