import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Pool} from "../pools/pool.entity";

interface ItemCreateAttrs {
  value: string,
  poolId: number
}

@Table({tableName: 'items'})
export class Item extends Model<Item, ItemCreateAttrs> {

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, allowNull: false})
  value: string;

  @Column({type: DataType.INTEGER})
  @ForeignKey(() => Pool)
  poolId: number;

  @BelongsTo(() => Pool)
  pool: Pool
}