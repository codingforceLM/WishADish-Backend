import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne
} from "typeorm";
import { Group } from "./Group";

@Entity()
export class Invitation {
    @PrimaryColumn() private _id: string;
    @Column("timestamp") private _timestamp: string;
    @Column({type: "varchar", length: 500}) private _url: string;
    @ManyToOne(() => Group, group => group.invites, {cascade: true}) private _group: Group;

    constructor(id: string, timestamp: string, url: string, group: Group) {
        this._id = id;
        this._timestamp = timestamp;
        this._url = url;
        this._group = group;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get timestamp(): string {
        return this._timestamp;
    }

    set timestamp(value: string) {
        this._timestamp = value;
    }

    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }

    get group(): Group {
        return this._group;
    }

    set group(value: Group) {
        this._group = value;
    }

}