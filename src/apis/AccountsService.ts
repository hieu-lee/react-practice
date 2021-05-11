import Account from "../models/Account";
import axios from "./axios";

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
