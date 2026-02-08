export interface UserData {
  username: string;
  password: string;
  role: 'standard' | 'locked' | 'performance_glitch' | 'invalid_user';
}