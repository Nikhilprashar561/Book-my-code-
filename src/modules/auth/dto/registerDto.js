import Joi from "joi";
import { baseDto } from "../../../common/config/baseDto.js";

class RegisterDto extends baseDto {
    static schema = Joi.object({
        fullName: Joi.string().min(2).max(15).required(),
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().required()
    })
}

export { RegisterDto }
