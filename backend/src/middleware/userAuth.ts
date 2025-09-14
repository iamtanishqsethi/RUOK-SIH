import jwt, { JwtPayload as DefaultJwtPayload } from 'jsonwebtoken';
import User, { IUser } from '../models/user';
import { NextFunction, Request, Response } from "express";

// Define extended request interface
interface AuthenticatedRequest extends Request {
    user?: IUser;
}

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //read token from cookies
        const { token } = req.cookies;

        //validate token
        if (!token) {
            throw new Error("Token not found")
        }

        //get id from token and check user
        const decoded = jwt.verify(token, process.env.JWT_KEY!) as DefaultJwtPayload & { _id: string };
        const user: IUser | null = await User.findById(decoded._id);
        if (!user) {
            throw new Error("User not found")
        }

        //set user in req object and pass control to next middleware
        (req as AuthenticatedRequest).user = user;
        next()
    }
    catch (err) {
        res.status(401).send((err as Error).message);
    }
}

export default userAuth;