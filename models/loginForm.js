import Joi from "joi";
import JoiMessages from "./helpers/joi-messages";

export const schema = () => {
  return Joi.object().keys({
    userName: Joi.string()
      .required()
      .label("User Name"),
    password: Joi.string()
      .required()
      .label("Password")
  });
};

export const validationMessages = () => {
  return {
    userName: {
      "any.required": "{{label}} is required",
      "any.empty": "{{label}} is required"
    },
    password: {
      "any.required": "{{label}} is required",
      "any.empty": "{{label}} is required"
    }
  };
};

export const validateLoginForm = data =>
  new Promise((resolve, reject) => {
    Joi.validate(
      data,
      schema(),
      { abortEarly: false, allowUnknown: true },
      (errors, values) => {
        if (errors) {
          // transform the error messages into a user-friendly variant
          let errorMessages = JoiMessages.transform(
            errors.details,
            values,
            validationMessages(),
            { singleErrorPerField: true }
          );
          resolve(errorMessages, values);
        }
        resolve();
      }
    );
  });
