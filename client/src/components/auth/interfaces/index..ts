interface SignInSubmitData {
  email: string,
  password: string
}

type OnSubmitCallback = (data: SignInSubmitData) => void;

export type {SignInSubmitData, OnSubmitCallback};