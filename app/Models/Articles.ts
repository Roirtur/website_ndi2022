import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";

export default class Articles extends BaseModel {
    @column({ isPrimary: true })
    public id: number;

    @column()
    public title: string;

    @column()
    public content: string;

    @column()
    public views: number;

    @column.dateTime({ autoCreate: true })
    public created_at: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updated_at: DateTime;
}