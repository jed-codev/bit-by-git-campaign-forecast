import Joi from "joi";

export const postCreate = Joi.object({
  data: {
    subject: Joi.string().max(80).required(),
    content: Joi.string().max(200).required(),
  },
});
