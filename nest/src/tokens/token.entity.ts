import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/user.entity";

interface TokenCreateAttrs {
  userId: number,
  refreshToken: string
}

@Table({tableName: 'token'})
export class Token extends Model<Token, TokenCreateAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, allowNull: false})
  refreshToken: string;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;

  @BelongsTo(() => User)
  user: User
}