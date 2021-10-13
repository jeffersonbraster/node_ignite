interface ICreateUserDTO {
  id?: string;
  avatar?: string;
  name: string;
  password: string;
  email: string;
  drive_license: string;
}

export { ICreateUserDTO };
