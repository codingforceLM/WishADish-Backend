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
    @PrimaryColumn() private _id: string;
    @ManyToOne(() => User, user => user.dishes, {cascade: true}) private _user: User;
    @ManyToOne(() => Dish, dish => dish.wishes, {cascade: true}) private _dish: Dish;
    @OneToMany(() => Vote, vote => vote.wish, {cascade: true}) private _votes: Vote[];

    constructor(id: string, user: User, dish: Dish, votes: Vote[]) {
        this._id = id;
        this._user = user;
        this._dish = dish;
        this._votes = votes;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }

    get dish(): Dish {
        return this._dish;
    }

    set dish(value: Dish) {
        this._dish = value;
    }

    get votes(): Vote[] {
        return this._votes;
    }

    set votes(value: Vote[]) {
        this._votes = value;
    }

}