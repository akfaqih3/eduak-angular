import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RegisterViewModel } from '../../models/register.view-model';
import { RoleEnum } from '../../../../../domain/entities/account.entity';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { InputComponent } from '../../../../shared/components/ui/input/input.component';

/**
 * RegisterFormComponent (Presentational Component)
 * 
 * This is a presentational/dumb component that displays the registration form.
 * It receives data via inputs and emits events via outputs.
 * It has no knowledge of business logic or services.
 * 
 * Responsibilities:
 * - Display registration form with validation
 * - Emit form submission event
 * - Show validation errors
 * - Handle form state (pristine, dirty, valid)
 * - Validate password confirmation
 */
@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  // Inputs
  readonly submitting = input<boolean>(false);

  // Outputs
  readonly submitForm = output<RegisterViewModel>();

  // Role options for dropdown
  readonly roleOptions = [
    { value: RoleEnum.Student, label: 'طالب' },
    { value: RoleEnum.Teacher, label: 'معلم' }
  ];

  // Form definition with validation
  readonly registerForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true
    }),
    phone: new FormControl('', {
      validators: [Validators.pattern(/^[0-9]{10,15}$/)],
      nonNullable: true
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    role: new FormControl(RoleEnum.Student, {
      validators: [Validators.required],
      nonNullable: true
    }),
    acceptTerms: new FormControl(false, {
      validators: [Validators.requiredTrue],
      nonNullable: true
    })
  }, {
    validators: this.passwordMatchValidator
  });

  /**
   * Custom validator to check if password and confirmPassword match
   */
  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  /**
   * Handle form submission
   * Validates form and emits the form data
   */
  onSubmit(): void {
    // Mark all fields as touched to show validation errors
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      const formValue = this.registerForm.getRawValue();
      this.submitForm.emit(formValue as RegisterViewModel);
    }
  }

  /**
   * Get error message for a form control
   * 
   * @param controlName - Name of the form control
   * @returns Error message or null
   */
  getErrorMessage(controlName: string): string | null {
    const control = this.registerForm.get(controlName);
    
    if (!control || !control.touched || !control.errors) {
      // Check for form-level errors (password mismatch)
      if (controlName === 'confirmPassword' && this.registerForm.errors?.['passwordMismatch']) {
        return 'كلمات المرور غير متطابقة';
      }
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
      return `يجب أن يحتوي على ${minLength} أحرف على الأقل`;
    }

    if (errors['pattern']) {
      if (controlName === 'phone') {
        return 'يرجى إدخال رقم هاتف صحيح (10-15 رقم)';
      }
    }

    if (errors['requiredTrue']) {
      return 'يجب الموافقة على الشروط والأحكام';
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
    const control = this.registerForm.get(controlName);
    const hasControlError = !!(control && control.invalid && control.touched);
    
    // Also check for form-level password mismatch error
    if (controlName === 'confirmPassword') {
      return hasControlError || !!(this.registerForm.errors?.['passwordMismatch'] && control?.touched);
    }
    
    return hasControlError;
  }
}
