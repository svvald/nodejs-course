export interface UserInputDTO {
  login: string;
  password: string;
  age: number;
}

export interface User extends UserInputDTO {
  id: string;
  isDeleted: boolean;
}
