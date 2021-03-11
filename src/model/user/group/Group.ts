import {
    Entity,
    Column,
    PrimaryColumn,
    OneToMany
} from "typeorm";
import { UserGroup } from "../UserGroup";
import { Invitation } from "./Invitation";
import {ShoppingList} from "../../shoppinglist/ShoppingList";

@Entity()
export class Group {
    @PrimaryColumn()
    private _id: string;
    @Column({type: "varchar", length: 100})
    private _title: string;
    @Column("date")
    private _creation: string;
    @OneToMany(() => UserGroup, userGroup => userGroup.group, {cascade: true})
    private _userGroups: UserGroup[];
    @OneToMany(() => Invitation, invitation => invitation.group, {cascade: true})
    private _invites: Invitation[];
    @OneToMany(() => ShoppingList, shoppingList => shoppingList.group, {cascade: true})
    private _lists: ShoppingList[];

    constructor(id: string, title: string, creation: string, userGroups: UserGroup[], invites: Invitation[], lists: ShoppingList[]) {
        this._id = id;
        this._title = title;
        this._creation = creation;
        this._userGroups = userGroups;
        this._invites = invites;
        this._lists = lists;
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

    get lists(): ShoppingList[] {
        return this._lists;
    }

    set lists(value: ShoppingList[]) {
        this._lists = value;
    }
}