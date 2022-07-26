import { Request, Response } from "express";
import userLoginService from "../services/userLogin.service";

const userLoginController = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const id = await userLoginService({email, password});

        return res.status(201).json({id});
    } catch (error) {
        if(error instanceof Error){
            return res.status(401).send({
                error: error.name,
                message: error.message
            })
        }
    }
}

export default userLoginController;