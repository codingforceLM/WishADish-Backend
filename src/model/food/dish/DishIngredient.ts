import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne
} from "typeorm";
import { Dish } from "./Dish";
import { Ingredient } from "../ingredients/Ingredient";

@Entity()
export class DishIngredient {
    @PrimaryColumn() private _id: string;
    @ManyToOne(() => Dish, dish => dish.dishIngredients, {cascade: true}) private _dish: Dish;
    @ManyToOne(() => Ingredient, ingredient => ingredient.dishIngredients, {cascade: true}) private _ingredient: Ingredient;
    @Column("double") private _amount: number;
    @Column({type: "varchar", length: 100}) private _unit: string;


    constructor(id: number, dish: Dish, ingredient: Ingredient, amount: number, unit: string) {
        this._id = id;
        this._dish = dish;
        this._ingredient = ingredient;
        this._amount = amount;
        this._unit = unit;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get dish(): Dish {
        return this._dish;
    }

    set dish(value: Dish) {
        this._dish = value;
    }

    get ingredient(): Ingredient {
        return this._ingredient;
    }

    set ingredient(value: Ingredient) {
        this._ingredient = value;
    }

    get amount(): number {
        return this._amount;
    }

    set amount(value: number) {
        this._amount = value;
    }

    get unit(): string {
        return this._unit;
    }

    set unit(value: string) {
        this._unit = value;
    }

}