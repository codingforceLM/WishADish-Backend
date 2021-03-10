"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var typeorm_1 = require("typeorm");
var Dish_1 = require("../food/dish/Dish");
var Ingredient_1 = require("../food/ingredients/Ingredient");
var UserGroup_1 = require("./UserGroup");
var Vote_1 = require("./vote/Vote");
var ShoppingList_1 = require("../shoppinglist/ShoppingList");
var User = /** @class */ (function () {
    function User(id, firstname, lastname, email, birthday, username, fileurl, dishes, ingredients, userGroups, votes, lists) {
        this._id = id;
        this._firstname = firstname;
        this._lastname = lastname;
        this._email = email;
        this._birthday = birthday;
        this._username = username;
        this._fileurl = fileurl;
        this._dishes = dishes;
        this._ingredients = ingredients;
        this._userGroups = userGroups;
        this._votes = votes;
        this._lists = lists;
    }
    Object.defineProperty(User.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "firstname", {
        get: function () {
            return this._firstname;
        },
        set: function (value) {
            this._firstname = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "lastname", {
        get: function () {
            return this._lastname;
        },
        set: function (value) {
            this._lastname = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (value) {
            this._email = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "birthday", {
        get: function () {
            return this._birthday;
        },
        set: function (value) {
            this._birthday = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "username", {
        get: function () {
            return this._username;
        },
        set: function (value) {
            this._username = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "fileurl", {
        get: function () {
            return this._fileurl;
        },
        set: function (value) {
            this._fileurl = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "dishes", {
        get: function () {
            return this._dishes;
        },
        set: function (value) {
            this._dishes = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "ingredients", {
        get: function () {
            return this._ingredients;
        },
        set: function (value) {
            this._ingredients = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "userGroups", {
        get: function () {
            return this._userGroups;
        },
        set: function (value) {
            this._userGroups = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "votes", {
        get: function () {
            return this._votes;
        },
        set: function (value) {
            this._votes = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "lists", {
        get: function () {
            return this._lists;
        },
        set: function (value) {
            this._lists = value;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], User.prototype, "_id", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 50 }),
        __metadata("design:type", String)
    ], User.prototype, "_firstname", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 50 }),
        __metadata("design:type", String)
    ], User.prototype, "_lastname", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 50 }),
        __metadata("design:type", String)
    ], User.prototype, "_email", void 0);
    __decorate([
        typeorm_1.Column("date"),
        __metadata("design:type", String)
    ], User.prototype, "_birthday", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 50 }),
        __metadata("design:type", String)
    ], User.prototype, "_username", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 250 }),
        __metadata("design:type", String)
    ], User.prototype, "_fileurl", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Dish_1.Dish; }, function (dish) { return dish.user; }, { cascade: true }),
        __metadata("design:type", Array)
    ], User.prototype, "_dishes", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Ingredient_1.Ingredient; }, function (ingredient) { return ingredient.user; }, { cascade: true }),
        __metadata("design:type", Array)
    ], User.prototype, "_ingredients", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return UserGroup_1.UserGroup; }, function (userGroup) { return userGroup.user; }, { cascade: true }),
        __metadata("design:type", Array)
    ], User.prototype, "_userGroups", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Vote_1.Vote; }, function (vote) { return vote.user; }, { cascade: true }),
        __metadata("design:type", Array)
    ], User.prototype, "_votes", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return ShoppingList_1.ShoppingList; }, function (shoppingList) { return shoppingList.user; }, { cascade: true }),
        __metadata("design:type", Array)
    ], User.prototype, "_lists", void 0);
    User = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [String, String, String, String, String, String, String, Array, Array, Array, Array, Array])
    ], User);
    return User;
}());
exports.User = User;
