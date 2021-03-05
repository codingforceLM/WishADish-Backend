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
exports.ShoppingList = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("../user/User");
var ShoppingListIngredient_1 = require("./ShoppingListIngredient");
var ShoppingList = /** @class */ (function () {
    function ShoppingList(id, title, done, user, shoppingListIngredients) {
        this.id = id;
        this.title = title;
        this.done = done;
        this.user = user;
        this.shoppingListIngredients = shoppingListIngredients;
    }
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], ShoppingList.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 100 }),
        __metadata("design:type", String)
    ], ShoppingList.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column("boolean"),
        __metadata("design:type", Boolean)
    ], ShoppingList.prototype, "done", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.lists; }),
        __metadata("design:type", User_1.User)
    ], ShoppingList.prototype, "user", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return ShoppingListIngredient_1.ShoppingListIngredient; }, function (shoppingListIngredient) { return shoppingListIngredient.list; }),
        __metadata("design:type", Array)
    ], ShoppingList.prototype, "shoppingListIngredients", void 0);
    ShoppingList = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [String, String, Boolean, User_1.User, Array])
    ], ShoppingList);
    return ShoppingList;
}());
exports.ShoppingList = ShoppingList;
