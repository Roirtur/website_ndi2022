import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Table2s extends BaseModel {
    @column({ isPrimary: true })
    public id: number;
}