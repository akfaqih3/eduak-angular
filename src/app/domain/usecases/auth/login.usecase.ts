import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../repositories/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCase {
  private repository = inject(AuthRepository);

  execute(email: string, password: string): Promise<any> {
    return this.repository.login(email, password);
  }
}
