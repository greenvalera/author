import {BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UserRoles} from "../roles/user-roles.entity";
import {Role} from "../roles/role.entity";
import {Post} from "../posts/post.entity";
import {Token} from "../tokens/token.entity";


interface UserCreationAttrs {
    email: string;
    password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'green@gmail.com', description: 'email адрес почты'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '123qwe', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: true, description: 'Признак подтверждения почты пользователя'})
    @Column({type: DataType.BOOLEAN, defaultValue: false, allowNull: false})
    isActivated: boolean;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    /**
     * custom fields
     */
    @HasMany(() => Post)
    posts: Post[];

    @HasOne(() => Token)
    token: Token
}