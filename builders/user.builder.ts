import { UserData } from '../models/user.model';

export class UserBuilder {
  private user: UserData;

  constructor() {
    this.user = {
      username: 'standard_user',
      password: 'secret_sauce',
      role: 'standard',
    };
  }

  asLockedOut(): this {
    this.user.username = 'locked_out_user';
    this.user.role = 'locked';
    return this;
  }

  asPerformanceGlitchUser(): this {
    this.user.username = 'performance_glitch_user';
    this.user.role = 'performance_glitch';
    return this;
  }

  asInvalidUser(): this {
    this.user.username = 'standard_user';
    this.user.password = 'wrong_password'
    this.user.role = 'invalid_user';
    return this
  }

  build(): UserData {
    return this.user;
  }
}