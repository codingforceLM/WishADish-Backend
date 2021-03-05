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
var Group = /** @class */ (function () {
    function Group(id, title, creation, userGroups, invites) {
        this.id = id;
        this.title = title;
        this.creation = creation;
        this.userGroups = userGroups;
        this.invites = invites;
    }
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], Group.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 100 }),
        __metadata("design:type", String)
    ], Group.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column("date"),
        __metadata("design:type", String)
    ], Group.prototype, "creation", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return UserGroup_1.UserGroup; }, function (userGroup) { return userGroup.group; }),
        __metadata("design:type", Array)
    ], Group.prototype, "userGroups", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Invitation_1.Invitation; }, function (invitation) { return invitation.group; }),
        __metadata("design:type", Array)
    ], Group.prototype, "invites", void 0);
    Group = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [String, String, String, Array, Array])
    ], Group);
    return Group;
}());
exports.Group = Group;
