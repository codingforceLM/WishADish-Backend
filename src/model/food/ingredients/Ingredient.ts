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
    @PrimaryColumn()
    id: string;
    @Column({type: "varchar", length: 100})
    title: string;
    @ManyToOne(() => User, user => user.dishes)
    user: User;
    @OneToMany(() => DishIngredient, dishIngredients => dishIngredients.ingredient)
    dishIngredients: DishIngredient[];
    @OneToMany(() => ShoppingListIngredient, shoppingListIngredient => shoppingListIngredient.ingredient)
    shoppingListIngredients: ShoppingListIngredient[];

    constructor(id: string, title: string, user: User, dishIngredients: DishIngredient[], shoppingListIngredients: ShoppingListIngredient[]) {
        this.id = id;
        this.title = title;
        this.user = user;
        this.dishIngredients = dishIngredients;
        this.shoppingListIngredients = shoppingListIngredients;
    }


}