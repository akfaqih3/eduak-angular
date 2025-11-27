import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../repositories/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class VerifyTokenUseCase {
  private repository = inject(AuthRepository);

  execute(token: string): Promise<any> {
    return this.repository.verifyToken(token);
  }
}
