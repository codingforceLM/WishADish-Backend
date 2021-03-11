import {
    Entity,
    Column,
    ManyToOne,
    PrimaryColumn, OneToMany
} from "typeorm";
import { User } from "../user/User";
import { ShoppingListIngredient } from "./ShoppingListIngredient";
import {Group} from "../user/group/Group";

@Entity()
export class ShoppingList {
    @PrimaryColumn() private _id: string;
    @Column({type: "varchar", length: 100}) private _title: string;
    @Column("boolean") private _done: boolean;
    @ManyToOne(() => User, user => user.lists, {cascade: true}) private _user: User;
    @ManyToOne(() => Group, group => group.lists, { cascade: true }) private _group: Group;
    @OneToMany(() => ShoppingListIngredient, shoppingListIngredient => shoppingListIngredient.list, {cascade: true}) private _shoppingListIngredients: ShoppingListIngredient[];

    constructor(id: string, title: string, done: boolean, user: User, shoppingListIngredients: ShoppingListIngredient[], group: Group) {
        this._id = id;
        this._title = title;
        this._done = done;
        this._user = user;
        this._shoppingListIngredients = shoppingListIngredients;
        this._group = group;
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

    get done(): boolean {
        return this._done;
    }

    set done(value: boolean) {
        this._done = value;
    }

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }

    get shoppingListIngredients(): ShoppingListIngredient[] {
        return this._shoppingListIngredients;
    }

    set shoppingListIngredients(value: ShoppingListIngredient[]) {
        this._shoppingListIngredients = value;
    }

    get group(): Group {
        return this._group;
    }

    set group(value: Group) {
        this._group = value;
    }
}