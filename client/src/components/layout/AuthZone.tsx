import React, {FC, Fragment, ReactNode} from 'react';


const AuthZone: FC<ReactNode> = ({children}) => (
    <Fragment>
        {children}
    </Fragment>
);

export default AuthZone;