interface CreateUserAttrs {
  id: number;
  email: string;
}

export class User {
  id: number;
  email: string;
  roles: string[];

  constructor(user: CreateUserAttrs) {
    this.id = user.id;
    this.email = user.email;
  }
}