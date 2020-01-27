export interface IUserInputDTO {
  login: string;
  password: string;
  age: number;
};

export interface IUser extends IUserInputDTO {
  id: string;
  isDeleted: boolean;
};