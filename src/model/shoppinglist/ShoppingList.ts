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
    @PrimaryColumn()
    id: string;
    @Column({type: "varchar", length: 100})
    title: string;
    @Column("boolean")
    done: boolean;
    @ManyToOne(() => User, user => user.lists)
    user: User;
    @OneToMany(() => ShoppingListIngredient, shoppingListIngredient => shoppingListIngredient.list)
    shoppingListIngredients: ShoppingListIngredient[];

    constructor(id: string, title: string, done: boolean, user: User, shoppingListIngredients: ShoppingListIngredient[]) {
        this.id = id;
        this.title = title;
        this.done = done;
        this.user = user;
        this.shoppingListIngredients = shoppingListIngredients;
    }
}