import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne, OneToMany
} from "typeorm";
import { User } from "../../user/User";
import { DishIngredient } from "../dish/DishIngredient";
import {ShoppingListIngredient} from "../../shoppinglist/ShoppingListIngredient";

@Entity()
export class Ingredient {
    @PrimaryColumn() private _id: string;
    @Column({type: "varchar", length: 100}) private _title: string;
    @ManyToOne(() => User, user => user.dishes, {cascade: true}) private _user: User;
    @OneToMany(() => DishIngredient, dishIngredients => dishIngredients.ingredient, {cascade: true}) private _dishIngredients: DishIngredient[];
    @OneToMany(() => ShoppingListIngredient, shoppingListIngredient => shoppingListIngredient.ingredient, {cascade: true}) private _shoppingListIngredients: ShoppingListIngredient[];

    constructor(id: string, title: string, user: User, dishIngredients: DishIngredient[], shoppingListIngredients: ShoppingListIngredient[]) {
        this._id = id;
        this._title = title;
        this._user = user;
        this._dishIngredients = dishIngredients;
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

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }

    get dishIngredients(): DishIngredient[] {
        return this._dishIngredients;
    }

    set dishIngredients(value: DishIngredient[]) {
        this._dishIngredients = value;
    }

    get shoppingListIngredients(): ShoppingListIngredient[] {
        return this._shoppingListIngredients;
    }

    set shoppingListIngredients(value: ShoppingListIngredient[]) {
        this._shoppingListIngredients = value;
    }


}