import {
    Entity,
    Column,
    ManyToOne,
    PrimaryColumn, OneToMany
} from "typeorm";
import { User } from "../user/User";
import { ShoppingListIngredient } from "./ShoppingListIngredient";

@Entity()
export class ShoppingList {
    @PrimaryColumn() private _id: string;
    @Column({type: "varchar", length: 100}) private _title: string;
    @Column("boolean") private _done: boolean;
    @ManyToOne(() => User, user => user.lists, {cascade: true}) private _user: User;
    @OneToMany(() => ShoppingListIngredient, shoppingListIngredient => shoppingListIngredient.list, {cascade: true}) private _shoppingListIngredients: ShoppingListIngredient[];

    constructor(id: string, title: string, done: boolean, user: User, shoppingListIngredients: ShoppingListIngredient[]) {
        this._id = id;
        this._title = title;
        this._done = done;
        this._user = user;
        this._shoppingListIngredients = shoppingListIngredients;
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

}