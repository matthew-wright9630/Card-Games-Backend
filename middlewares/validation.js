const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

function validateUrl(value, helpers) {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
}

const validateGameId = celebrate({
  params: Joi.object().keys({
    gameId: Joi.string().alphanum().length(24),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
});

const validateUserSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateUrl).messages({
      "string.empty": `The "avatar" field must be filled in`,
      "string.uri": `The avatar field must have a valid url`,
    }),
    email: Joi.string().required().email().messages({
      "string.empty": "The email field must be filled in",
      "string.email": "The email field must have a valid email format",
    }),
    password: Joi.string().required().min(8).messages({
      "string.empty": "The password field must be filled in",
    }),
  }),
});

const validateUserSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": "The email field must be filled in",
      "string.email": "The email field must have a valid email format",
    }),
    password: Joi.string().required().messages({
      "string.empty": "The password field must be filled in",
    }),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateUrl).messages({
      "string.empty": `The "avatar" field must be filled in`,
      "string.uri": `The avatar field must have a valid url`,
    }),
  }),
});

const validateGameInfoCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().valid("Solitaire", "War").messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    description: Joi.string().required().min(10).max(1000).messages({
      "string.min": 'The minimum length of the "description" field is 2',
      "string.max": 'The maximum length of the "description" field is 30',
      "string.empty": 'The "description" field must be filled in',
    }),
    gamesPlayed: Joi.number().messages({
      "number.empty": "the gamesPlayed field must be entered",
    }),
    gamesWon: Joi.number().messages({
      "number.empty": "the gamesWon field must be entered",
    }),
    liked: Joi.boolean().messages({
      "boolean.empty": "The liked field must be entered",
    }),
  }),
});

module.exports = {
  validateGameId,
  validateUserId,
  validateUserSignIn,
  validateUserSignUp,
  validateUpdateUser,
  validateGameInfoCreation,
};
