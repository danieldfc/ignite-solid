import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const existsUserAdmin = this.usersRepository.findById(user_id);

    if (!existsUserAdmin) {
      throw new Error("User not found");
    }

    if (!existsUserAdmin.admin) {
      throw new Error("This user must be an administrator");
    }

    const users = this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };
