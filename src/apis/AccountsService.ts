import Account from "../models/Account";
import axios from "./axios";

// call this function to send new account info to the server
// it will return an error if the account has already existed
// to get the error message: use err.response.data (with "err" is the name of your error variable)
export async function SignUp(account: Account) {
  await axios
    .post("/api/Accounts/sign-up", account)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
  return null;
}

// call this function to send the login info to the server
// it will return an error if the username doesn't exist or the password is incorrect
// to get the error message: use err.response.data (with "err" is the name of your error variable)
export async function SignIn(account: Account) {
  await axios
    .post("/api/Accounts/sign-in", account)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
  return null;
}
