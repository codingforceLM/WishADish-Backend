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
var User = /** @class */ (function () {
    function User(id, firstname, lastname, email, birthday, username, fileurl, dishes, ingredients) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.birthday = birthday;
        this.username = username;
        this.fileurl = fileurl;
        this.dishes = dishes;
        this.ingredients = ingredients;
    }
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 50 }),
        __metadata("design:type", String)
    ], User.prototype, "firstname", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 50 }),
        __metadata("design:type", String)
    ], User.prototype, "lastname", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 50 }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column("date"),
        __metadata("design:type", String)
    ], User.prototype, "birthday", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 50 }),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 250 }),
        __metadata("design:type", String)
    ], User.prototype, "fileurl", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Dish_1.Dish; }, function (dish) { return dish.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "dishes", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Ingredient_1.Ingredient; }, function (ingredient) { return ingredient.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "ingredients", void 0);
    User = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [String, String, String, String, String, String, String, Array, Array])
    ], User);
    return User;
}());
exports.User = User;
