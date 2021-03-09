import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne, PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./User";
import { Group } from "./group/Group";

@Entity()
export class UserGroup {
    @PrimaryGeneratedColumn()
    private _id: number;
    @Column("date")
    private _entrydate: string;
    @Column({type:"varchar", length: 100})
    private _role: string;
    @ManyToOne(() => User, user => user.userGroups)
    private _user: User;
    @ManyToOne(() => Group, group => group.userGroups)
    private _group: Group;

    constructor(id: number, entrydate: string, role: string, user: User, group: Group) {
        this._id = id;
        this._entrydate = entrydate;
        this._role = role;
        this._user = user;
        this._group = group;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get entrydate(): string {
        return this._entrydate;
    }

    set entrydate(value: string) {
        this._entrydate = value;
    }

    get role(): string {
        return this._role;
    }

    set role(value: string) {
        this._role = value;
    }

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }

    get group(): Group {
        return this._group;
    }

    set group(value: Group) {
        this._group = value;
    }


}