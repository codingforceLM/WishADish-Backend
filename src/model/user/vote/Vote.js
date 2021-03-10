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
exports.Vote = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("../../user/User");
var Wish_1 = require("../../food/dish/Wish");
var Vote = /** @class */ (function () {
    function Vote(id, vote, user, wish) {
        this._id = id;
        this._vote = vote;
        this._user = user;
        this._wish = wish;
    }
    Object.defineProperty(Vote.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vote.prototype, "vote", {
        get: function () {
            return this._vote;
        },
        set: function (value) {
            this._vote = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vote.prototype, "user", {
        get: function () {
            return this._user;
        },
        set: function (value) {
            this._user = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vote.prototype, "wish", {
        get: function () {
            return this._wish;
        },
        set: function (value) {
            this._wish = value;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Vote.prototype, "_id", void 0);
    __decorate([
        typeorm_1.Column("int"),
        __metadata("design:type", Number)
    ], Vote.prototype, "_vote", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.votes; }, { cascade: true }),
        __metadata("design:type", User_1.User)
    ], Vote.prototype, "_user", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Wish_1.Wish; }, function (wish) { return wish.votes; }, { cascade: true }),
        __metadata("design:type", Wish_1.Wish)
    ], Vote.prototype, "_wish", void 0);
    Vote = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [Number, Number, User_1.User, Wish_1.Wish])
    ], Vote);
    return Vote;
}());
exports.Vote = Vote;
