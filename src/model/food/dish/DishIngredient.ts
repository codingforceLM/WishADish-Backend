import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne, PrimaryGeneratedColumn
} from "typeorm";
import { Dish } from "./Dish";
import { Ingredient } from "../ingredients/Ingredient";

@Entity()
export class DishIngredient {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Dish, dish => dish.dishIngredients)
    dish: Dish;
    @ManyToOne(() => Ingredient, ingredient => ingredient.dishIngredients)
    ingredient: Ingredient;
    @Column("double")
    ammount: number;
    @Column({type: "varchar", length: 100})
    unit: string;

    constructor(id: number, dish: Dish, ingredient: Ingredient, ammount: number, unit: string) {
        this.id = id;
        this.dish = dish;
        this.ingredient = ingredient;
        this.ammount = ammount;
        this.unit = unit;
    }
}