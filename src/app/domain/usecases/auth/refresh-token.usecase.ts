import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../repositories/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenUseCase {
  private repository = inject(AuthRepository);

  execute(refreshToken: string): Promise<any> {
    return this.repository.refreshToken(refreshToken);
  }
}
