import { IUserLogin } from "../interfaces/users";
import { User } from "../entities/user.entity";
import * as bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { AppDataSource } from "../data-source";

const userLoginService = async ({email, password}: IUserLogin) => {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find()

    const account = users.find(user => user.email === email);

    if(!account){
        throw new Error("Email ou senha incorretos");
    }

    if(!bcrypt.compareSync(password, account.password)){
        throw new Error("Email ou senha incorretos");
    }

    const token = jwt.sign(
        {email: email}, String(process.env.JWT_SECRET),
        {expiresIn: "1h"}
    )

    return token;
}

export default userLoginService;