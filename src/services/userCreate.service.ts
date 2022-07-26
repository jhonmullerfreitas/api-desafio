import { User } from "../entities/user.entity";
import { IUserCreate, IUser } from "../interfaces/users";
import * as bcrypt from "bcrypt"
import { AppDataSource } from "../data-source";

const userCreateService = async ({name, email, password}: IUserCreate) => {
    
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();

    
    const emailAlreadyExists = users.find(user => user.email === email)
    const hashedPassword = await bcrypt.hash(password, 10);

    if(emailAlreadyExists){
        throw new Error("Email already exists");
    }

    const user = new User()
    user.name = name
    user.email = email
    user.password = hashedPassword;

    userRepository.create(user)
    await userRepository.save(user)



    return user;
}

export default userCreateService;