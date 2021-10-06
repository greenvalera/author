import React, {FC, Fragment} from 'react';
import LoginForm from "../LoginForm";

const SignUp: FC = () => {
    return (
        <Fragment>
            <LoginForm isRegister={true}/>
        </Fragment>
    );
};

export default SignUp;