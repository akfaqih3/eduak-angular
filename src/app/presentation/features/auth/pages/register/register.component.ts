import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '../../services/auth.facade';
import { RegisterViewModel } from '../../models/register.view-model';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { CardComponent } from '../../../../shared/components/ui/card/card.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/feedback/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../../../shared/components/feedback/error-message/error-message.component';
import { AccountEntity } from '../../../../../domain/entities/account.entity';

/**
 * RegisterComponent (Smart Component)
 * 
 * This is a container/smart component that handles the business logic
 * for the registration page. It interacts with AuthFacade to perform
 * registration operations and manages the page state.
 * 
 * Responsibilities:
 * - Handle registration form submission
 * - Interact with AuthFacade
 * - Manage loading and error states
 * - Navigate on successful registration
 * - Display presentational RegisterFormComponent
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RegisterFormComponent,
    CardComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly authFacade = inject(AuthFacade);
  private readonly router = inject(Router);

  // Local component state
  readonly submitting = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  /**
   * Handle registration form submission
   * Called when user submits the registration form
   * 
   * @param registrationData - Registration data from the form
   */
  async onRegister(registrationData: RegisterViewModel): Promise<void> {
    // Clear previous messages
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.submitting.set(true);

    try {
      // Create AccountEntity from view model
      const account: AccountEntity = {
        email: registrationData.email,
        password: registrationData.password,
        name: registrationData.name,
        phone: registrationData.phone || null,
        role: registrationData.role,
        photo: '',
        bio: ''
      };

      // Call AuthFacade to perform registration
      const success = await this.authFacade.register(account);

      if (success) {
        // Show success message
        this.successMessage.set('تم إنشاء الحساب بنجاح! جاري تحويلك لتسجيل الدخول...');
        
        // Navigate to login page after a short delay
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      } else {
        // Show error message if registration failed
        this.errorMessage.set(
          this.authFacade.error() || 'فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.'
        );
      }
    } catch (error) {
      // Handle unexpected errors
      this.errorMessage.set('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
      console.error('Registration error:', error);
    } finally {
      this.submitting.set(false);
    }
  }

  /**
   * Navigate to login page
   */
  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  /**
   * Clear error message
   */
  clearError(): void {
    this.errorMessage.set(null);
  }
}
