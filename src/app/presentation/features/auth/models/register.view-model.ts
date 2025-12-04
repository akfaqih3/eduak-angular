import { RoleEnum } from '../../../../domain/entities/account.entity';

/**
 * RegisterViewModel
 * ViewModel for registration form data
 */
export interface RegisterViewModel {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone?: string;
  role: RoleEnum;
  acceptTerms: boolean;
}

/**
 * Create an empty RegisterViewModel with default values
 */
export function createEmptyRegisterViewModel(): RegisterViewModel {
  return {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    role: RoleEnum.Student,
    acceptTerms: false
  };
}
