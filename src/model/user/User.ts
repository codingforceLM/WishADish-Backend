import {
    Entity,
    Column,
    PrimaryColumn,
    OneToMany
} from "typeorm";
import { Dish } from "../food/dish/Dish";
import { Ingredient } from "../food/ingredients/Ingredient";
import { UserGroup } from "./UserGroup";
import { Vote } from "./vote/Vote";
import { ShoppingList } from "../shoppinglist/ShoppingList";

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
    @OneToMany(() => UserGroup, userGroup => userGroup.user)
    userGroups: UserGroup[];
    @OneToMany(() => Vote, vote => vote.user)
    votes: Vote[];
    @OneToMany(() => ShoppingList, shoppingList => shoppingList.user)
    lists: ShoppingList[];

    constructor(id: string, firstname: string, lastname: string, email: string, birthday: string, username: string, fileurl: string, dishes: Dish[], ingredients: Ingredient[], userGroups: UserGroup[], votes: Vote[], lists: ShoppingList[]) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.birthday = birthday;
        this.username = username;
        this.fileurl = fileurl;
        this.dishes = dishes;
        this.ingredients = ingredients;
        this.userGroups = userGroups;
        this.votes = votes;
        this.lists = lists;
    }
}