export interface AuthInfo {
  token: string;
  expirationTokenUtc: string;
  refreshToken: string;
  expirationRefreshTokenUtc: Date;
  roles: string[];
  username: string;
  email: string;
  userId: number;
}
