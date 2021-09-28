interface User {
  id: string;
  name: string;
  accessToken: string;
}

export interface UserState {
  user: User;
  result: number;
}

export interface LoginInterface {
  username: string;
  password: string;
}

export interface RegisterInterface {
  username: string;
  password: string;
  title: string;
}
