export interface User {
  email: string;
  _id: string;
  username: string;
}

export interface Response {
  success: boolean;
  message: string;
  user: User;
}

export interface Token {
  id: string;
  iat: number;
  exp: number;
}

export interface VerifyUser {
  id: string;
  email: string;
  password: string;
  username : string
  createdAt: Date;
  upadatedAt: Date;
}

export interface Logout {
  success : boolean
  message : string
}

