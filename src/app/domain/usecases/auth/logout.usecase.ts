import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../repositories/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class LogoutUseCase {
  private repository = inject(AuthRepository);

  execute(): Promise<any> {
    return this.repository.logout();
  }
}
