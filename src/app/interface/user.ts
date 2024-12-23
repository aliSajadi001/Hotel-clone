export interface User {
  email: string;
  _id: string;
}

export interface Response {
  success: boolean;
  message: string;
  user : User
}



export interface Login {
  success: boolean;
  message: string;
}
