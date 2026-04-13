import { ApiError } from "../utils/ApiError.js";

const Validation = function (DtoClass) {
  return (req, res, next) => {
    const { error, value } = DtoClass.validate(req.body);

    if (error) {
      throw ApiError.badRequest(error.split("; "));
    }

    req.body = value;
    next();
  };
};

export { Validation };
