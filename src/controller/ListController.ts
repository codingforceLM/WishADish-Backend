import express from "express";
import {ShoppingList} from "../model/shoppinglist/ShoppingList";
import {ShoppingListIngredient} from "../model/shoppinglist/ShoppingListIngredient";
import {getConnection} from "typeorm/index";
import {In} from "typeorm";
import {User} from "../model/user/User";
import {Group} from "../model/user/group/Group";
import {UserGroup} from "../model/user/UserGroup";
import {Ingredient} from "../model/food/ingredients/Ingredient";
const {v4: uuidv4} = require('uuid');
const middleware = require("../middleware/loginsystem");

const router = express.Router();

router.get("/", middleware.isLoggedIn, async function (req, res) {
    const userId = req.header("userId");
    const done = req.header("done");
    if (userId == undefined || userId == "") {
        return res.status(404).json({"error": "required field undefined"});
    }

    let results_ug = undefined as unknown as UserGroup[];
    try {
        results_ug = await getConnection().getRepository(UserGroup).find(
            {
                relations: ['_group'],
                where:
                    {_user: userId}
            }) as UserGroup[];
    } catch(e) {
        console.log(e);
        return res.status(400).json({"error": "Unknown groupId"});
    }

    if(results_ug == undefined || results_ug == [] || results_ug.length == 0) {
        return res.status(200).json([]);
    }

    let groupIds = [];
    for(let i=0;i<results_ug.length;i++) {
        groupIds.push(results_ug[i].group.id);
    }

    let lists;
    let json = [];
    try{
        if(done == "true"){
            // @ts-ignore
            lists = await getConnection().getRepository(ShoppingList).find(
                {
                    where:
                        {_group: In(groupIds),_done : Number(0)},
                    order: {_title: "ASC"}
                }) as ShoppingList[];
        }else {
            // @ts-ignore
            lists = await getConnection().getRepository(ShoppingList).find(
                {
                    where:
                        {_group: In(groupIds)},
                    order: {_title: "ASC"}
                }) as ShoppingList[];
        }

    }catch(e) {
        console.log(e);
        return res.status(400).json({"error": "Unknown groupId"});
    }

    if(lists == undefined || lists == [] || lists.length == 0) {
        return res.status(400).json({"error": "Error at db access"});
    }
    for(let i=0; i<lists.length;i++){
        let result;
        try{
            result = await getConnection().getRepository(ShoppingListIngredient).find(
                {
                    relations: ['_ingredient'],
                    where:
                        {_list: lists[i]}
                }) as ShoppingListIngredient[];
        }catch(e) {
            console.log(e);
            return res.status(400).json({"error": "Unknown groupId"});
        }

        if(result == undefined || result == []) {
            return res.status(400).json({"error": "Error at db access"});
        }

        let ingrd = []
        for(let i=0; i<result.length;i++){
            ingrd.push({
                'id': result[i].ingredient.id,
                'name': result[i].ingredient.title,
                'done': result[i].done
            })
        }

        json.push({
            'id': lists[i].id,
            'name': lists[i].title,
            'ingredients': ingrd
        })
    }

    return res.status(200).json(json);
});

router.get("/:id", middleware.isLoggedIn, async function(req, res){
    const id = req.params.id;
    if(id == undefined || id.trim() == "") {
        return res.status(400).json({"error": "required field undefined"});
    }

    let result = undefined as unknown as ShoppingList;
    try{
        // @ts-ignore
        result = await getConnection().getRepository(ShoppingList).findOne(
            {
                where:
                    {_id: id},
                order: {_title: "ASC"}
            }) as ShoppingList;
    }catch(e) {
        console.log(e);
        return res.status(400).json({"error": "Unknown id"});
    }
    if(result == undefined) {
        return res.status(400).json({"error": "Unknown id"});
    }

    let json = {
        "id": result.id,
        "name": result.title,
        "done": result.done,
        "ingredients": [] as Object[]
    };

    let results_sli = undefined as unknown as ShoppingListIngredient[];
    try{
        results_sli = await getConnection().getRepository(ShoppingListIngredient).find(
            {
                relations: ['_ingredient'],
                where:
                    {_list: result.id}
            }) as ShoppingListIngredient[];
    }catch(e) {
        console.log(e);
        return res.status(400).json({"error": "Error at db access"});
    }

    if(results_sli == [] || results_sli.length == 0) {
        json.ingredients=[]
    }

    for(let i=0;i<results_sli.length;i++) {
        let ingrd = results_sli[i].ingredient;
        json.ingredients.push({
            "id": ingrd.id,
            "name": ingrd.title,
            "amount": results_sli[i].ammount,
            "unit": results_sli[i].unit,
            "done": results_sli[i].done
        });
    }
    try{
        // @ts-ignore
        json.ingredients.sort((a,b)=> (a["name"]> b["name"] ? 1 : -1))
    }catch (e) {
        console.log(e)
    }

    return res.status(200).json(json);
});

router.post("/", middleware.isLoggedIn, async function (req, res) {
    const name = req.header("name");
    const groupId = req.header("groupId");
    const userId = req.header("userId");
    if (name == undefined || name == "" || groupId == undefined || groupId == ""|| userId == undefined || userId == "") {
        return res.status(404).json({"error": "required field undefined"});
    }

    let user;
    let group;
    try{
        user = await getConnection().getRepository(User).findOne(
            {
                where:
                    {_id: userId}
            }) as User;
        group = await getConnection().getRepository(Group).findOne(
            {
                where:
                    {_id: groupId}
            }) as Group;
    }catch(e) {
        console.log(e);
        return res.status(400).json({"error": "Unknown userId"});
    }

    if(user == undefined || group == undefined ) {
        return res.status(400).json({"error": "Error at db access"});
    }
    let list = new ShoppingList(uuidv4(),name,false,user,undefined as unknown as ShoppingListIngredient[],group)
    try{
        await getConnection().getRepository(ShoppingList).manager.save(list)
    }catch (e){
        console.log(e)
        return res.status(400).json({"error": "Error at db access"});
    }
    let json = {
        "msg": "List created"
    };
    return res.status(200).json(json);
});

router.put("/", middleware.isLoggedIn, async function (req, res) {
    const shoppinglist = req.header("shoppinglist");
    const name = req.header("name");
    const done = req.header("done");
    let slJson = []
    if (shoppinglist == undefined || shoppinglist == "") {
        return res.status(404).json({"error": "required field undefined"});
    }
    try{
        if (shoppinglist != null) {
            slJson = JSON.parse(shoppinglist)
        }
    }catch (e) {
        console.log(e)
    }

    //ShoppingList
    let slEntity = undefined;
    try{
        slEntity = await getConnection().getRepository(ShoppingList).findOne(
            {
                where:
                    {_id: slJson.id}
            }) as ShoppingList;
    }catch(e) {
        console.log(e);
        return res.status(400).json({"error": "Unknown id"});
    }
    if(slEntity == undefined) {
        return res.status(400).json({"error": "Unknown id"});
    }
    if(name != undefined && name != ""){
        slEntity.title=name
    }
    if(done != undefined && done != ""){
        slEntity.done= ((done=="true") ? true : false)
    }

    //ShoppingListIngredient
    let ingredients = undefined;
    try{
        ingredients = await getConnection().getRepository(ShoppingListIngredient).find(
            {
                relations: ['_ingredient'],
                where:
                    {_list: slJson.id}
            }) as ShoppingListIngredient[];
    }catch(e) {
        console.log(e);
        return res.status(400).json({"error": "Unknown id"});
    }
    if(ingredients == undefined) {
        return res.status(400).json({"error": "Unknown id"});
    }
    try{
        await getConnection().getRepository(ShoppingListIngredient).manager.remove(ingredients)
    }catch (e){
        console.log(e)
        return res.status(400).json({"error": "Error at db access"});
    }
    let newIngredients: ShoppingListIngredient[] = []
    for(let i=0; i<slJson.ingredients.length; i++){
        newIngredients.push(new ShoppingListIngredient(
            uuidv4(),
            slJson.id,
            slJson.ingredients[i].id,
            slJson.ingredients[i].amount,
            slJson.ingredients[i].unit,
            slJson.ingredients[i].done))
    }
    try{
        await getConnection().getRepository(ShoppingListIngredient).manager.save(newIngredients)
        await getConnection().getRepository(ShoppingList).manager.save(slEntity)
    }catch (e){
        console.log(e)
        return res.status(400).json({"error": "Error at db access"});
    }

    return res.status(200).json({"msg": "List updated"});
});



router.delete("/", middleware.isLoggedIn, function (req, res) {
    const id = req.header("id");
    if (id == undefined || id == "") {
        return res.status(404).json({"error": "required field undefined"});
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    let json = {
        "msg": "List deleted",
        "arguments": {
            "id": id
        }
    }

    return res.status(200).json(json);
});


module.exports = router;
