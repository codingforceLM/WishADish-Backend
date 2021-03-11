import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne
} from "typeorm";
import { User } from "./User";
import { Group } from "./group/Group";

@Entity()
export class UserGroup {
    @PrimaryColumn()
    private _id: string;
    @Column("date")
    private _entrydate: string;
    @Column({type:"varchar", length: 100})
    private _role: string;
    @ManyToOne(() => User, user => user.userGroups, {cascade: true})
    private _user: User;
    @ManyToOne(() => Group, group => group.userGroups, {cascade: true})
    private _group: Group;

    constructor(id: string, entrydate: string, role: string, user: User, group: Group) {
        this._id = id;
        this._entrydate = entrydate;
        this._role = role;
        this._user = user;
        this._group = group;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
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