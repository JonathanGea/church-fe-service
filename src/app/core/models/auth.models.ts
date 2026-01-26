export interface AuthUser {
  id: string;
  name: string;
  roles: string[];
}

export interface AuthPayload {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: AuthUser;
}
