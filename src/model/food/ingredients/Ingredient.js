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
exports.Ingredient = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("../../user/User");
var DishIngredient_1 = require("../dish/DishIngredient");
var ShoppingListIngredient_1 = require("../../shoppinglist/ShoppingListIngredient");
var Ingredient = /** @class */ (function () {
    function Ingredient(id, title, user, dishIngredients, shoppingListIngredients) {
        this._id = id;
        this._title = title;
        this._user = user;
        this._dishIngredients = dishIngredients;
        this._shoppingListIngredients = shoppingListIngredients;
    }
    Object.defineProperty(Ingredient.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ingredient.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            this._title = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ingredient.prototype, "user", {
        get: function () {
            return this._user;
        },
        set: function (value) {
            this._user = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ingredient.prototype, "dishIngredients", {
        get: function () {
            return this._dishIngredients;
        },
        set: function (value) {
            this._dishIngredients = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ingredient.prototype, "shoppingListIngredients", {
        get: function () {
            return this._shoppingListIngredients;
        },
        set: function (value) {
            this._shoppingListIngredients = value;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], Ingredient.prototype, "_id", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 100 }),
        __metadata("design:type", String)
    ], Ingredient.prototype, "_title", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.dishes; }, { cascade: true }),
        __metadata("design:type", User_1.User)
    ], Ingredient.prototype, "_user", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return DishIngredient_1.DishIngredient; }, function (dishIngredients) { return dishIngredients.ingredient; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Ingredient.prototype, "_dishIngredients", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return ShoppingListIngredient_1.ShoppingListIngredient; }, function (shoppingListIngredient) { return shoppingListIngredient.ingredient; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Ingredient.prototype, "_shoppingListIngredients", void 0);
    Ingredient = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [String, String, User_1.User, Array, Array])
    ], Ingredient);
    return Ingredient;
}());
exports.Ingredient = Ingredient;
