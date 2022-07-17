import Joi from "joi";

export const userSignupvalidation = (data)=>{

    const schema = Joi.object({
        name: Joi.string().required().max(20).label('Username'),
        email: Joi.string().email().required().label('Email').lowercase(),
        password: Joi.string().required().min(6).max(20).label('Password'),
    })

  
    return schema.validate(data);
}