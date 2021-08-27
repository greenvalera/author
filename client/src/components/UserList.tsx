import React, {useState} from 'react';
import UserService from "../services/userService";
import {IUser} from "../models/IUser";

function UserList() {
    const [users, setUsers] = useState<IUser[]>([] as IUser[])

    const fetchUsers = async () => {
        const users = await UserService.fetchUsers();
        setUsers(users)
    }


    return (
        <div>
            <button onClick={fetchUsers}>Get users</button>
            {users.map((user => {
                return (<div key={user.email}>{user.email}</div>)
            }))}
        </div>
    );
}

export default UserList;