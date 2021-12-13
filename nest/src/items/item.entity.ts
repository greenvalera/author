import {Column, DataType, Model, Table} from "sequelize-typescript";

interface ItemCreateAttrs {
  value: string,
}

@Table({tableName: 'items'})
export class Item extends Model<Item, ItemCreateAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  @Column({type: DataType.STRING, allowNull: false})
  value: string;
}