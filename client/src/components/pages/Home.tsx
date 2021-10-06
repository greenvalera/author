import React, {FC, Fragment} from "react";
import UserList from "../UserList";
import UserInfo from "../UserInfo";

const Home: FC = () => {
    return (
        <Fragment>
            <UserInfo />
            <UserList />
        </Fragment>
    )
};

export default Home;