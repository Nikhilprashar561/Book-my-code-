import Joi from "joi";
import { baseDto } from "../../../common/config/baseDto.js";

class LoginDto extends baseDto {
    static schema = Joi.object({
        email: Joi.string().email().required().lowercase(),
        password: Joi.string().required()

    })
}

export { LoginDto }
