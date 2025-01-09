const { Joi, celebrate } = require("celebrate");
const JoiDate = require("joi-date-extensions");
const validator = require("validator");

function validateUrl(value, helpers) {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
}

const pattern = /^[a-zA-Z0-9 ]{2,30}$/;

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
    name: Joi.string().required().min(2).max(30).regex(pattern).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
      "string.pattern.base":
        "The name field can only contain alphanumeric characters",
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
    name: Joi.string().required().min(2).max(30).regex(pattern).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
      "string.pattern.base":
        "The name field can only contain alphanumeric characters",
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
    owner: Joi.string().alphanum().length(24).messages({
      "string.length": "The user must be 24 characters",
      "string.empty": "The user field must be included",
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

const validateFeedbackRequest = celebrate({
  body: {
    feedbackType: Joi.string()
      .required()
      .valid("recommendation", "bug")
      .messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),
    email: Joi.string().required().email().messages({
      "string.empty": "The email field must be filled in",
      "string.email": "The email field must have a valid email format",
    }),
    description: Joi.string().required().messages({
      "string.min": "The minimum length of the description field is 10",
      "string.empty": 'The "description" field must be filled in',
    }),
    date: Joi.string()
      .custom((value, helpers) => {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          return helpers.error("any.invalid");
        }
        return date;
      })
      .required()
      .messages({
        "date.empty": "Date field cannot be empty",
        "date.format": "Date field must be in a MM/DD/YYYY format",
      }),
  },
});

module.exports = {
  validateGameId,
  validateUserId,
  validateUserSignIn,
  validateUserSignUp,
  validateUpdateUser,
  validateGameInfoCreation,
  validateFeedbackRequest,
};
