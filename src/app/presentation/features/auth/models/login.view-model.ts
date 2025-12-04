/**
 * LoginViewModel
 * ViewModel for login form data
 */
export interface LoginViewModel {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Create an empty LoginViewModel with default values
 */
export function createEmptyLoginViewModel(): LoginViewModel {
  return {
    email: '',
    password: '',
    rememberMe: false
  };
}
