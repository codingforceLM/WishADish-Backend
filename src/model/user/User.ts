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
    private _id: string;
    @Column({type: "varchar", length: 50})
    private _firstname: string;
    @Column({type: "varchar", length: 50})
    private _lastname: string;
    @Column({type: "varchar", length: 50})
    private _email: string;
    @Column({type: "varchar", length: 500})
    private _password: string;
    @Column("date")
    private _birthday: string;
    @Column({type: "varchar", length: 50})
    private _username: string;
    @Column({type:"datetime", nullable: true})
    private _lastlogin: string;
    @Column({type: "varchar", length: 250})
    private _fileurl: string;
    @OneToMany(() => Dish, dish => dish.user, {cascade: true})
    private _dishes: Dish[];
    @OneToMany(() => Ingredient, ingredient => ingredient.user, {cascade: true})
    private _ingredients: Ingredient[];
    @OneToMany(() => UserGroup, userGroup => userGroup.user, {cascade: true})
    private _userGroups: UserGroup[];
    @OneToMany(() => Vote, vote => vote.user, {cascade: true})
    private _votes: Vote[];
    @OneToMany(() => ShoppingList, shoppingList => shoppingList.user, {cascade: true})
    private _lists: ShoppingList[];

    constructor(id: string, firstname: string, lastname: string, email: string, password: string, birthday: string, username: string, lastlogin: string, fileurl: string, dishes: Dish[], ingredients: Ingredient[], userGroups: UserGroup[], votes: Vote[], lists: ShoppingList[]) {
        this._id = id;
        this._firstname = firstname;
        this._lastname = lastname;
        this._email = email;
        this._password = password;
        this._birthday = birthday;
        this._username = username;
        this._lastlogin = lastlogin;
        this._fileurl = fileurl;
        this._dishes = dishes;
        this._ingredients = ingredients;
        this._userGroups = userGroups;
        this._votes = votes;
        this._lists = lists;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get firstname(): string {
        return this._firstname;
    }

    set firstname(value: string) {
        this._firstname = value;
    }

    get lastname(): string {
        return this._lastname;
    }

    set lastname(value: string) {
        this._lastname = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get birthday(): string {
        return this._birthday;
    }

    set birthday(value: string) {
        this._birthday = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get fileurl(): string {
        return this._fileurl;
    }

    set fileurl(value: string) {
        this._fileurl = value;
    }

    get dishes(): Dish[] {
        return this._dishes;
    }

    set dishes(value: Dish[]) {
        this._dishes = value;
    }

    get ingredients(): Ingredient[] {
        return this._ingredients;
    }

    set ingredients(value: Ingredient[]) {
        this._ingredients = value;
    }

    get userGroups(): UserGroup[] {
        return this._userGroups;
    }

    set userGroups(value: UserGroup[]) {
        this._userGroups = value;
    }

    get votes(): Vote[] {
        return this._votes;
    }

    set votes(value: Vote[]) {
        this._votes = value;
    }

    get lists(): ShoppingList[] {
        return this._lists;
    }

    set lists(value: ShoppingList[]) {
        this._lists = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get lastlogin(): string {
        return this._lastlogin;
    }

    set lastlogin(value: string) {
        this._lastlogin = value;
    }
}
