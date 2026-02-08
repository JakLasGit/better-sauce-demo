import { UserData } from '../models/user.model';

export class UserFactory {
  private static getPassword(): string {
    const password = process.env.SAUCE_PASSWORD;

    if (!password) {
      throw new Error('❌ FATAL ERROR: SAUCE_PASSWORD is not set in .env file!');
    }

    return password;
  }

  static createStandardUser(): UserData {
    return {
      username: 'standard_user',
      password: this.getPassword(),
      role: 'standard',
    };
  }

  static createLockedUser(): UserData {
    return {
      username: 'locked_out_user',
      password: this.getPassword(),
      role: 'locked',
    };
  }

  static createPerformanceGlitchUser(): UserData {
    return {
      username: 'performance_glitch_user',
      password: this.getPassword(),
      role: 'performance_glitch',
    };
  }

  static createInvalidUser(): UserData {
    return {
      username: `standard_user`,
      password: 'wrong_password_123',
      role: 'standard',
    };
  }
}
