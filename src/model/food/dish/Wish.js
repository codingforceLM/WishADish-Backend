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
exports.Wish = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("../../user/User");
var Dish_1 = require("./Dish");
var Vote_1 = require("../../user/vote/Vote");
var Group_1 = require("../../user/group/Group");
var Wish = /** @class */ (function () {
    function Wish(id, daytime, date, user, dish, group, votes) {
        this._id = id;
        this._daytime = daytime;
        this._date = date;
        this._user = user;
        this._dish = dish;
        this._group = group;
        this._votes = votes;
    }
    Object.defineProperty(Wish.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Wish.prototype, "user", {
        get: function () {
            return this._user;
        },
        set: function (value) {
            this._user = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Wish.prototype, "dish", {
        get: function () {
            return this._dish;
        },
        set: function (value) {
            this._dish = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Wish.prototype, "votes", {
        get: function () {
            return this._votes;
        },
        set: function (value) {
            this._votes = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Wish.prototype, "daytime", {
        get: function () {
            return this._daytime;
        },
        set: function (value) {
            this._daytime = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Wish.prototype, "group", {
        get: function () {
            return this._group;
        },
        set: function (value) {
            this._group = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Wish.prototype, "date", {
        get: function () {
            return this._date;
        },
        set: function (value) {
            this._date = value;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], Wish.prototype, "_id", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 50 }),
        __metadata("design:type", String)
    ], Wish.prototype, "_daytime", void 0);
    __decorate([
        typeorm_1.Column("date"),
        __metadata("design:type", String)
    ], Wish.prototype, "_date", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.dishes; }, { cascade: true }),
        __metadata("design:type", User_1.User)
    ], Wish.prototype, "_user", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Dish_1.Dish; }, function (dish) { return dish.wishes; }, { cascade: true }),
        __metadata("design:type", Dish_1.Dish)
    ], Wish.prototype, "_dish", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Group_1.Group; }, function (group) { return group.wishes; }, { cascade: true }),
        __metadata("design:type", Group_1.Group)
    ], Wish.prototype, "_group", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Vote_1.Vote; }, function (vote) { return vote.wish; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Wish.prototype, "_votes", void 0);
    Wish = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [String, String, String, User_1.User, Dish_1.Dish, Group_1.Group, Array])
    ], Wish);
    return Wish;
}());
exports.Wish = Wish;
