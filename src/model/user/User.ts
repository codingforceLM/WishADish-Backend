import {
    Entity,
    Column,
    PrimaryColumn,
    OneToMany
} from "typeorm";
import { Dish } from "../food/dish/Dish";
import { Ingredient } from "../food/ingredients/Ingredient";

@Entity()
export class User {
    @PrimaryColumn()
    id: string;
    @Column({type: "varchar", length: 50})
    firstname: string;
    @Column({type: "varchar", length: 50})
    lastname: string;
    @Column({type: "varchar", length: 50})
    email: string;
    @Column("date")
    birthday: string;
    @Column({type: "varchar", length: 50})
    username: string;
    @Column({type: "varchar", length: 250})
    fileurl: string;
    @OneToMany(() => Dish, dish => dish.user)
    dishes: Dish[];
    @OneToMany(() => Ingredient, ingredient => ingredient.user)
    ingredients: Ingredient[];

    constructor(id: string, firstname: string, lastname: string, email: string, birthday: string, username: string, fileurl: string, dishes: Dish[], ingredients: Ingredient[]) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.birthday = birthday;
        this.username = username;
        this.fileurl = fileurl;
        this.dishes = dishes;
        this.ingredients = ingredients;
    }

}