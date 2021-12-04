import { Sequelize } from 'sequelize-typescript';
import {User} from "../users/user.entity";
import {Role} from "../roles/role.entity";
import {UserRoles} from "../roles/user-roles.entity";

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: process.env.DB_HOST,
                port: Number.parseInt(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
            });
            sequelize.addModels([User, Role, UserRoles]);
            await sequelize.sync();
            return sequelize;
        },
    },
];