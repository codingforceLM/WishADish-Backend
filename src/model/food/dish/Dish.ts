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
    @PrimaryColumn()
    id: string;
    @Column({type: "varchar", length: 100})
    title: string;
    @ManyToOne(() => User, user => user.dishes)
    user: User;
    @OneToMany(() => DishIngredient, dishIngredients => dishIngredients.dish)
    dishIngredients: DishIngredient[];
    @ManyToOne(() => Wish, wish => wish.dish)
    wishes: Wish[];

    constructor(id: string, title: string, user: User, dishIngredients: DishIngredient[], wishes: Wish[]) {
        this.id = id;
        this.title = title;
        this.user = user;
        this.dishIngredients = dishIngredients;
        this.wishes = wishes;
    }
}