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
    function ShoppingListIngredient(id, ammount, unit, list, ingredient) {
        this.id = id;
        this.ammount = ammount;
        this.unit = unit;
        this.list = list;
        this.ingredient = ingredient;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], ShoppingListIngredient.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column("double"),
        __metadata("design:type", Number)
    ], ShoppingListIngredient.prototype, "ammount", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 100 }),
        __metadata("design:type", String)
    ], ShoppingListIngredient.prototype, "unit", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return ShoppingList_1.ShoppingList; }, function (shoppingList) { return shoppingList.shoppingListIngredients; }),
        __metadata("design:type", ShoppingList_1.ShoppingList)
    ], ShoppingListIngredient.prototype, "list", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Ingredient_1.Ingredient; }, function (ingredient) { return ingredient.shoppingListIngredients; }),
        __metadata("design:type", Ingredient_1.Ingredient)
    ], ShoppingListIngredient.prototype, "ingredient", void 0);
    ShoppingListIngredient = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [Number, Number, String, ShoppingList_1.ShoppingList, Ingredient_1.Ingredient])
    ], ShoppingListIngredient);
    return ShoppingListIngredient;
}());
exports.ShoppingListIngredient = ShoppingListIngredient;
