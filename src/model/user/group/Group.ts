import {
    Entity,
    Column,
    PrimaryColumn,
    OneToMany
} from "typeorm";
import { UserGroup } from "../UserGroup";
import { Invitation } from "./Invitation";

@Entity()
export class Group {
    @PrimaryColumn()
    private _id: string;
    @Column({type: "varchar", length: 100})
    private _title: string;
    @Column("date")
    private _creation: string;
    @OneToMany(() => UserGroup, userGroup => userGroup.group)
    private _userGroups: UserGroup[];
    @OneToMany(() => Invitation, invitation => invitation.group)
    private _invites: Invitation[];

    constructor(id: string, title: string, creation: string, userGroups: UserGroup[], invites: Invitation[]) {
        this._id = id;
        this._title = title;
        this._creation = creation;
        this._userGroups = userGroups;
        this._invites = invites;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get creation(): string {
        return this._creation;
    }

    set creation(value: string) {
        this._creation = value;
    }

    get userGroups(): UserGroup[] {
        return this._userGroups;
    }

    set userGroups(value: UserGroup[]) {
        this._userGroups = value;
    }

    get invites(): Invitation[] {
        return this._invites;
    }

    set invites(value: Invitation[]) {
        this._invites = value;
    }
}