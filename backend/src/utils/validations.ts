import Joi from "joi";
import { Request } from "express";

export const signupValidation = Joi.object({
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).optional().allow(""),
    photoURL: Joi.string().uri().optional().allow(""),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const logInValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const editProfileValidation = (req: Request): boolean => {
    const allowedEditFields = ["firstName", "lastName", "photoUrl", "bio"];
    return Object.keys(req.body).every((field) => allowedEditFields.includes(field));
};
