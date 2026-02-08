import { UserBuilder } from '../builders/user.builder';
import { UserData } from '../models/user.model';

export class UserFactory {
  static createStandardUser(): UserData {
    return new UserBuilder().build();
  }

  static createLockedUser(): UserData {
    return new UserBuilder().asLockedOut().build();
  }

  static createPerformanceGlitchUser(): UserData {
    return new UserBuilder().asPerformanceGlitchUser().build();
  }

  static createInvalidUser(): UserData {
    return new UserBuilder().asInvalidUser().build()
  }
}