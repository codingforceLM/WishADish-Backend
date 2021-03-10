import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne,
    OneToMany
} from "typeorm";
import { User } from "../../user/User";
import { DishIngredient } from "./DishIngredient";
import { Wish } from "./Wish";

@Entity()
export class Dish {
    @PrimaryColumn() private _id: string;
    @Column({type: "varchar", length: 100}) private _title: string;
    @ManyToOne(() => User, user => user.dishes, {cascade: true}) private _user: User;
    @OneToMany(() => DishIngredient, dishIngredients => dishIngredients.dish, {cascade: true}) private _dishIngredients: DishIngredient[];
    @OneToMany(() => Wish, wish => wish.dish, {cascade: true}) private _wishes: Wish[];

    constructor(id: string, title: string, user: User, dishIngredients: DishIngredient[], wishes: Wish[]) {
        this._id = id;
        this._title = title;
        this._user = user;
        this._dishIngredients = dishIngredients;
        this._wishes = wishes;
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

    get wishes(): Wish[] {
        return this._wishes;
    }

    set wishes(value: Wish[]) {
        this._wishes = value;
    }


}