import * as React from "react";
import {OnSubmitCallback} from "../interfaces/index.";

const getHandleSubmit = (onSubmit: OnSubmitCallback) => (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);

  const email = data.get('email');
  const password  = data.get('password');

  if (!email || !password) return;

  onSubmit({
    email: email.toString(),
    password: password.toString()
  });
};

export default getHandleSubmit;