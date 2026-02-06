export interface UserData {
  username: string;
  password: string;
  role: 'standard' | 'locked' | 'problem' | 'performance_glitch';
}