import {
    Entity,
    Column,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { User } from "../../user/User";
import { Wish } from "../../food/dish/Wish";

@Entity()
export class Vote {
    @PrimaryGeneratedColumn()
    id: number;
    @Column("int")
    vote: number;
    @ManyToOne(() => User, user => user.votes)
    user: User;
    @ManyToOne(() => Wish, wish => wish.votes)
    wish: Wish;

    constructor(id: number, vote: number, user: User, wish: Wish) {
        this.id = id;
        this.vote = vote;
        this.user = user;
        this.wish = wish;
    }
}