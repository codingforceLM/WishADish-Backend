import {
    Entity,
    Column,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Ingredient } from "../food/ingredients/Ingredient";
import { ShoppingList } from "./ShoppingList";

@Entity()
export class ShoppingListIngredient {
    @PrimaryGeneratedColumn()
    id: number;
    @Column("double")
    ammount: number;
    @Column({type: "varchar", length: 100})
    unit: string;
    @ManyToOne(() => ShoppingList, shoppingList => shoppingList.shoppingListIngredients)
    list: ShoppingList;
    @ManyToOne(() => Ingredient, ingredient => ingredient.shoppingListIngredients)
    ingredient: Ingredient;

    constructor(id: number, ammount: number, unit: string, list: ShoppingList, ingredient: Ingredient) {
        this.id = id;
        this.ammount = ammount;
        this.unit = unit;
        this.list = list;
        this.ingredient = ingredient;
    }
}