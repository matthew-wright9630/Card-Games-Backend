const forbiddenErrorMessage = "You do not have permission for this action";
const badRequestErrorMessage = "Invalid data";
const castErrorMessage = "The id string is in an invalid format";
const notFoundErrorMessage = "No matching result found";
const conflictErrorMessage =
  "Email address is already taken. Please provide a new email";
const authenticationErrorMessage = "Incorrect email or password";
const successDeleteGameInfoMessage =
  "Game information has been successfully deleted";
const successDeleteUserMessage = "User has been successfully deleted";
const emailValidityMessage = "You must enter a valid email address";

module.exports = {
  forbiddenErrorMessage,
  badRequestErrorMessage,
  castErrorMessage,
  notFoundErrorMessage,
  conflictErrorMessage,
  authenticationErrorMessage,
  successDeleteGameInfoMessage,
  successDeleteUserMessage,
  emailValidityMessage,
};
