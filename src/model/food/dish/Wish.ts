import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne,
    OneToMany
} from "typeorm";
import { User } from "../../user/User";
import { Dish} from "./Dish";
import {Vote} from "../../user/vote/Vote";

@Entity()
export class Wish {
    @PrimaryColumn()
    id: string;
    @ManyToOne(() => User, user => user.dishes)
    user: User;
    @OneToMany(() => Dish, dish => dish.wishes)
    dish: Dish;
    @OneToMany(() => Vote, vote => vote.wish)
    votes: Vote[];

    constructor(id: string, user: User, dish: Dish, votes: Vote[]) {
        this.id = id;
        this.user = user;
        this.dish = dish;
        this.votes = votes;
    }

}