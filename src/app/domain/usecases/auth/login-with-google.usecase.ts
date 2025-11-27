import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../repositories/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class LoginWithGoogleUseCase {
  private repository = inject(AuthRepository);

  execute(): Promise<any> {
    return this.repository.loginWithGoogle();
  }
}
