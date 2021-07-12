import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ name, email }: IRequest): User {
    const existsUser = this.usersRepository.findByEmail(email);

    if (existsUser) {
      throw new Error("Already exists this user");
    }

    const user = this.usersRepository.create({
      name,
      email,
    });

    return user;
  }
}

export { CreateUserUseCase };
