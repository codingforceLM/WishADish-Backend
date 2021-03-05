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
exports.DishIngredient = void 0;
var typeorm_1 = require("typeorm");
var Dish_1 = require("./Dish");
var Ingredient_1 = require("../ingredients/Ingredient");
var DishIngredient = /** @class */ (function () {
    function DishIngredient(id, dish, ingredient, ammount, unit) {
        this.id = id;
        this.dish = dish;
        this.ingredient = ingredient;
        this.ammount = ammount;
        this.unit = unit;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], DishIngredient.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Dish_1.Dish; }, function (dish) { return dish.dishIngredients; }),
        __metadata("design:type", Dish_1.Dish)
    ], DishIngredient.prototype, "dish", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Ingredient_1.Ingredient; }, function (ingredient) { return ingredient.dishIngredients; }),
        __metadata("design:type", Ingredient_1.Ingredient)
    ], DishIngredient.prototype, "ingredient", void 0);
    __decorate([
        typeorm_1.Column("double"),
        __metadata("design:type", Number)
    ], DishIngredient.prototype, "ammount", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 100 }),
        __metadata("design:type", String)
    ], DishIngredient.prototype, "unit", void 0);
    DishIngredient = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [Number, Dish_1.Dish, Ingredient_1.Ingredient, Number, String])
    ], DishIngredient);
    return DishIngredient;
}());
exports.DishIngredient = DishIngredient;
