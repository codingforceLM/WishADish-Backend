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
exports.UserGroup = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Group_1 = require("./group/Group");
var UserGroup = /** @class */ (function () {
    function UserGroup(id, entrydate, role, user, group) {
        this._id = id;
        this._entrydate = entrydate;
        this._role = role;
        this._user = user;
        this._group = group;
    }
    Object.defineProperty(UserGroup.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserGroup.prototype, "entrydate", {
        get: function () {
            return this._entrydate;
        },
        set: function (value) {
            this._entrydate = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserGroup.prototype, "role", {
        get: function () {
            return this._role;
        },
        set: function (value) {
            this._role = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserGroup.prototype, "user", {
        get: function () {
            return this._user;
        },
        set: function (value) {
            this._user = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserGroup.prototype, "group", {
        get: function () {
            return this._group;
        },
        set: function (value) {
            this._group = value;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], UserGroup.prototype, "_id", void 0);
    __decorate([
        typeorm_1.Column("date"),
        __metadata("design:type", String)
    ], UserGroup.prototype, "_entrydate", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 100 }),
        __metadata("design:type", String)
    ], UserGroup.prototype, "_role", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.userGroups; }),
        __metadata("design:type", User_1.User)
    ], UserGroup.prototype, "_user", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Group_1.Group; }, function (group) { return group.userGroups; }),
        __metadata("design:type", Group_1.Group)
    ], UserGroup.prototype, "_group", void 0);
    UserGroup = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [Number, String, String, User_1.User, Group_1.Group])
    ], UserGroup);
    return UserGroup;
}());
exports.UserGroup = UserGroup;
