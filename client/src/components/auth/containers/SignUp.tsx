import * as React from 'react';
import {useDispatch} from "react-redux";
import {Fragment, useCallback} from "react";
import {SignInSubmitData} from "../interfaces/index.";
import {registration} from "../../../store/authSlice";
import SignUpComponent from "../components/SignUp";

export default function SignUp() {
  const dispatch = useDispatch();

  const onSubmit = useCallback((data: SignInSubmitData) => {
    dispatch(registration(data));
  }, [dispatch]);

  return (
    <Fragment>
      <SignUpComponent
        onSubmit={onSubmit}
        signInUrl={"/login"}
      />
    </Fragment>
  );
};