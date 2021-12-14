import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {PoolStatus} from "./constants/PoolStatus";
import {User} from "../users/user.entity";
import {Item} from "../items/item.entity";

interface PoolCreateAttrs {
  name: string,
  description: string,
  userId: number,
}

@Table({tableName: "pools"})
export class Pool extends Model<Pool, PoolCreateAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 1})
  status: PoolStatus;

  @Column({type: DataType.INTEGER})
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo( () => User)
  author: User;

  @HasMany( () => Item)
  items: Item[]
}