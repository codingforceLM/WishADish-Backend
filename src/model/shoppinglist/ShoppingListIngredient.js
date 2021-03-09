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
exports.ShoppingListIngredient = void 0;
var typeorm_1 = require("typeorm");
var Ingredient_1 = require("../food/ingredients/Ingredient");
var ShoppingList_1 = require("./ShoppingList");
var ShoppingListIngredient = /** @class */ (function () {
    function ShoppingListIngredient(id, list, ingredient, ammount, unit) {
        this._id = id;
        this._ammount = ammount;
        this._unit = unit;
        this._list = list;
        this._ingredient = ingredient;
    }
    Object.defineProperty(ShoppingListIngredient.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShoppingListIngredient.prototype, "ammount", {
        get: function () {
            return this._ammount;
        },
        set: function (value) {
            this._ammount = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShoppingListIngredient.prototype, "unit", {
        get: function () {
            return this._unit;
        },
        set: function (value) {
            this._unit = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShoppingListIngredient.prototype, "list", {
        get: function () {
            return this._list;
        },
        set: function (value) {
            this._list = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShoppingListIngredient.prototype, "ingredient", {
        get: function () {
            return this._ingredient;
        },
        set: function (value) {
            this._ingredient = value;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], ShoppingListIngredient.prototype, "_id", void 0);
    __decorate([
        typeorm_1.Column("double"),
        __metadata("design:type", Number)
    ], ShoppingListIngredient.prototype, "_ammount", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 100 }),
        __metadata("design:type", String)
    ], ShoppingListIngredient.prototype, "_unit", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return ShoppingList_1.ShoppingList; }, function (shoppingList) { return shoppingList.shoppingListIngredients; }),
        __metadata("design:type", ShoppingList_1.ShoppingList)
    ], ShoppingListIngredient.prototype, "_list", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Ingredient_1.Ingredient; }, function (ingredient) { return ingredient.shoppingListIngredients; }),
        __metadata("design:type", Ingredient_1.Ingredient)
    ], ShoppingListIngredient.prototype, "_ingredient", void 0);
    ShoppingListIngredient = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [Number, ShoppingList_1.ShoppingList, Ingredient_1.Ingredient, Number, String])
    ], ShoppingListIngredient);
    return ShoppingListIngredient;
}());
exports.ShoppingListIngredient = ShoppingListIngredient;
