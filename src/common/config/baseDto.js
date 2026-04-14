import Joi from "joi";

class baseDto {
    static schema = Joi.object({});

    static validate(userData) {
        const {error, value } = this.schema.validate(userData, {
            abortEarly: false,
            stripUnknown: true
        })

        if(error) {
            const errors = error.details.map(e => e.message);
            return {errors, value: null} 
        }
        return { errors: null, value }
    }
}

export { baseDto }
