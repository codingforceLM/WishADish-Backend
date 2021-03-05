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
exports.Invitation = void 0;
var typeorm_1 = require("typeorm");
var Group_1 = require("./Group");
var Invitation = /** @class */ (function () {
    function Invitation(id, timestamp, url, group) {
        this.id = id;
        this.timestamp = timestamp;
        this.url = url;
        this.group = group;
    }
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], Invitation.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column("timestamp"),
        __metadata("design:type", String)
    ], Invitation.prototype, "timestamp", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 500 }),
        __metadata("design:type", String)
    ], Invitation.prototype, "url", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Group_1.Group; }, function (group) { return group.invites; }),
        __metadata("design:type", Group_1.Group)
    ], Invitation.prototype, "group", void 0);
    Invitation = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [String, String, String, Group_1.Group])
    ], Invitation);
    return Invitation;
}());
exports.Invitation = Invitation;
