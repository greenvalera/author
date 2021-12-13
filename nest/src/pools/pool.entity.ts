import {Column, DataType, Model, Table} from "sequelize-typescript";
import {PoolStatus} from "./constants/PoolStatus";

interface PoolCreateAttrs {
  name: string,
  description: string,
  userId: number,
  status: PoolStatus,
}

@Table({tableName: "pools"})
export class Pool extends Model<Pool, PoolCreateAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @Column({type: DataType.INTEGER, allowNull: false})
  userId: number;

  @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 1})
  status: PoolStatus;
}