import * as React from 'react';
import {Fragment, useCallback} from "react";
import SignInComponent from "../components/SignIn";
import {useDispatch} from "react-redux";
import {login} from "../../../store/authSlice";
import {SignInSubmitData} from "../interfaces/index.";

export default function SignIn() {
  const dispatch = useDispatch();

  const onSubmit = useCallback((data: SignInSubmitData) => {
    dispatch(login(data));
  }, [dispatch]);

  return (
    <Fragment>
      <SignInComponent
        onSubmit={onSubmit}
        signUpUrl={"/signUp"}
      />
    </Fragment>
  );
}