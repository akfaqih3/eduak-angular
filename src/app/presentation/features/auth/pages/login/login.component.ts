import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '../../services/auth.facade';
import { LoginViewModel } from '../../models/login.view-model';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { CardComponent } from '../../../../shared/components/ui/card/card.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/feedback/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../../../shared/components/feedback/error-message/error-message.component';

/**
 * LoginComponent (Smart Component)
 * 
 * This is a container/smart component that handles the business logic
 * for the login page. It interacts with AuthFacade to perform login
 * operations and manages the page state.
 * 
 * Responsibilities:
 * - Handle login form submission
 * - Interact with AuthFacade
 * - Manage loading and error states
 * - Navigate on successful login
 * - Display presentational LoginFormComponent
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LoginFormComponent,
    CardComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authFacade = inject(AuthFacade);
  private readonly router = inject(Router);

  // Local component state
  readonly submitting = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  /**
   * Handle login form submission
   * Called when user submits the login form
   * 
   * @param credentials - Login credentials from the form
   */
  async onLogin(credentials: LoginViewModel): Promise<void> {
    // Clear previous errors
    this.errorMessage.set(null);
    this.submitting.set(true);

    try {
      // Call AuthFacade to perform login
      const success = await this.authFacade.login(
        credentials.email,
        credentials.password
      );

      if (success) {
        // Navigate to dashboard on successful login
        await this.router.navigate(['/']);
      } else {
        // Show error message if login failed
        this.errorMessage.set(
          this.authFacade.error() || 'فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد.'
        );
      }
    } catch (error) {
      // Handle unexpected errors
      this.errorMessage.set('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
      console.error('Login error:', error);
    } finally {
      this.submitting.set(false);
    }
  }

  /**
   * Navigate to registration page
   */
  navigateToRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  /**
   * Clear error message
   */
  clearError(): void {
    this.errorMessage.set(null);
  }
}
