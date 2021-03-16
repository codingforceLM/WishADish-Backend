import {
    Entity,
    Column,
    ManyToOne,
    PrimaryColumn
} from "typeorm";
import { Ingredient } from "../food/ingredients/Ingredient";
import { ShoppingList } from "./ShoppingList";

@Entity()
export class ShoppingListIngredient {
    @PrimaryColumn() private _id: string;
    @Column("double") private _ammount: number;
    @Column({type: "varchar", length: 100}) private _unit: string;
    @Column("boolean") private _done: boolean;
    @ManyToOne(() => ShoppingList, shoppingList => shoppingList.shoppingListIngredients, {cascade: true}) private _list: ShoppingList;
    @ManyToOne(() => Ingredient, ingredient => ingredient.shoppingListIngredients, {cascade: true}) private _ingredient: Ingredient;

    constructor(id: string, list: ShoppingList, ingredient: Ingredient, ammount: number, unit: string, done: boolean) {
        this._id = id;
        this._ammount = ammount;
        this._unit = unit;
        this._list = list;
        this._ingredient = ingredient;
        this._done = done;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get ammount(): number {
        return this._ammount;
    }

    set ammount(value: number) {
        this._ammount = value;
    }

    get unit(): string {
        return this._unit;
    }

    set unit(value: string) {
        this._unit = value;
    }

    get list(): ShoppingList {
        return this._list;
    }

    set list(value: ShoppingList) {
        this._list = value;
    }

    get ingredient(): Ingredient {
        return this._ingredient;
    }

    set ingredient(value: Ingredient) {
        this._ingredient = value;
    }

    get done(): boolean {
        return this._done;
    }

    set done(value: boolean) {
        this._done = value;
    }

}
