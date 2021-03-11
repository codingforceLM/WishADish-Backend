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
import {Group} from "../../user/group/Group";

@Entity()
export class Wish {
    @PrimaryColumn() private _id: string;
    @Column({type: "varchar", length: 50})
    private _daytime: string;
    @Column("date")
    private _date: string;
    @ManyToOne(() => User, user => user.dishes, {cascade: true}) private _user: User;
    @ManyToOne(() => Dish, dish => dish.wishes, {cascade: true}) private _dish: Dish;
    @ManyToOne(() => Group, group => group.wishes, {cascade: true}) private _group: Group;
    @OneToMany(() => Vote, vote => vote.wish, {cascade: true}) private _votes: Vote[];

    constructor(id: string, daytime: string, date: string, user: User, dish: Dish, group: Group, votes: Vote[]) {
        this._id = id;
        this._daytime = daytime;
        this._date = date;
        this._user = user;
        this._dish = dish;
        this._group = group;
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
    get daytime(): string {
        return this._daytime;
    }

    set daytime(value: string) {
        this._daytime = value;
    }
    get group(): Group {
        return this._group;
    }

    set group(value: Group) {
        this._group = value;
    }

    get date(): string {
        return this._date;
    }

    set date(value: string) {
        this._date = value;
    }
}