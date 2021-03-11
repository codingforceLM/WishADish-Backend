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
exports.Group = void 0;
var typeorm_1 = require("typeorm");
var UserGroup_1 = require("../UserGroup");
var Invitation_1 = require("./Invitation");
var ShoppingList_1 = require("../../shoppinglist/ShoppingList");
var Wish_1 = require("../../food/dish/Wish");
var Group = /** @class */ (function () {
    function Group(id, title, creation, userGroups, invites, lists, wishes) {
        this._id = id;
        this._title = title;
        this._creation = creation;
        this._userGroups = userGroups;
        this._invites = invites;
        this._lists = lists;
        this._wishes = wishes;
    }
    Object.defineProperty(Group.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            this._title = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "creation", {
        get: function () {
            return this._creation;
        },
        set: function (value) {
            this._creation = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "userGroups", {
        get: function () {
            return this._userGroups;
        },
        set: function (value) {
            this._userGroups = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "invites", {
        get: function () {
            return this._invites;
        },
        set: function (value) {
            this._invites = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "lists", {
        get: function () {
            return this._lists;
        },
        set: function (value) {
            this._lists = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "wishes", {
        get: function () {
            return this._wishes;
        },
        set: function (value) {
            this._wishes = value;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], Group.prototype, "_id", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 100 }),
        __metadata("design:type", String)
    ], Group.prototype, "_title", void 0);
    __decorate([
        typeorm_1.Column({ type: "date" }),
        __metadata("design:type", String)
    ], Group.prototype, "_creation", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return UserGroup_1.UserGroup; }, function (userGroup) { return userGroup.group; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Group.prototype, "_userGroups", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Invitation_1.Invitation; }, function (invitation) { return invitation.group; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Group.prototype, "_invites", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return ShoppingList_1.ShoppingList; }, function (shoppingList) { return shoppingList.group; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Group.prototype, "_lists", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Wish_1.Wish; }, function (wish) { return wish.group; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Group.prototype, "_wishes", void 0);
    Group = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [String, String, String, Array, Array, Array, Array])
    ], Group);
    return Group;
}());
exports.Group = Group;
