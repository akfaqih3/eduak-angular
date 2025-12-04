import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginViewModel } from '../../models/login.view-model';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { InputComponent } from '../../../../shared/components/ui/input/input.component';

/**
 * LoginFormComponent (Presentational Component)
 * 
 * This is a presentational/dumb component that displays the login form.
 * It receives data via inputs and emits events via outputs.
 * It has no knowledge of business logic or services.
 * 
 * Responsibilities:
 * - Display login form with validation
 * - Emit form submission event
 * - Show validation errors
 * - Handle form state (pristine, dirty, valid)
 */
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  // Inputs
  readonly submitting = input<boolean>(false);

  // Outputs
  readonly submitForm = output<LoginViewModel>();

  // Form definition with validation
  readonly loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true
    }),
    rememberMe: new FormControl(false, {
      nonNullable: true
    })
  });

  /**
   * Handle form submission
   * Validates form and emits the form data
   */
  onSubmit(): void {
    // Mark all fields as touched to show validation errors
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      const formValue = this.loginForm.getRawValue();
      this.submitForm.emit(formValue as LoginViewModel);
    }
  }

  /**
   * Get error message for a form control
   * 
   * @param controlName - Name of the form control
   * @returns Error message or null
   */
  getErrorMessage(controlName: string): string | null {
    const control = this.loginForm.get(controlName);
    
    if (!control || !control.touched || !control.errors) {
      return null;
    }

    const errors = control.errors;

    if (errors['required']) {
      return 'هذا الحقل مطلوب';
    }

    if (errors['email']) {
      return 'يرجى إدخال بريد إلكتروني صحيح';
    }

    if (errors['minlength']) {
      const minLength = errors['minlength'].requiredLength;
      return `يجب أن تحتوي كلمة المرور على ${minLength} أحرف على الأقل`;
    }

    return 'قيمة غير صحيحة';
  }

  /**
   * Check if a control has an error and is touched
   * 
   * @param controlName - Name of the form control
   * @returns True if control has error and is touched
   */
  hasError(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }
}
