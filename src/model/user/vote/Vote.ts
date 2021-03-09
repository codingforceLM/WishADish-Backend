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
    @PrimaryGeneratedColumn() private _id: number;
    @Column("int") private _vote: number;
    @ManyToOne(() => User, user => user.votes) private _user: User;
    @ManyToOne(() => Wish, wish => wish.votes) private _wish: Wish;

    constructor(id: number, vote: number, user: User, wish: Wish) {
        this._id = id;
        this._vote = vote;
        this._user = user;
        this._wish = wish;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get vote(): number {
        return this._vote;
    }

    set vote(value: number) {
        this._vote = value;
    }

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }

    get wish(): Wish {
        return this._wish;
    }

    set wish(value: Wish) {
        this._wish = value;
    }

}