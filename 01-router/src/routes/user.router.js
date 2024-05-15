//import express from 'express';
//const router = express.Router();

import { Router } from "express";
const router = Router();

import userManager from '../manager/user.manager.js';
const userManager = new UserManager('../data/users.json');


router.get('/', async(req,res)=>{
    try {
        const users = await userManager.getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.get("/:idUser", async (req, res) => {
    try {
        const { idUser } = req.params;
        const user = await userManager.getUserById(idUser);
        if(!user) res.status(404).json({msg: 'user not esta '})
            else res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
})

router.post('/', async(req,res)=>{
    try {
        console.log(req.body);
        const user = await userManager.createUser(req.body);
        if(!user) res.status(404).json({msg: 'user already existe'})
            else req.status(200).json({data: user});
        console.log(user)
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put("/:idUser", async (req, res) => {
    try {
        const { idUser } = req.params;
        const response = await userManager.updateUser(req.body, idUser)
        if(!response) res.status(404).json({msg: 'error updating user'});
        else res.status(200).json(response);
    } catch (error) {
            console.log(error);
            res.status(500).send(error.message);
    }
 })

router.delete("/:idUser", async (req, res) => {
    try {
        const { idUser } = req.params;
        const response = await userManager.deleteUser(idUser)
        if(!response) res.status(404).json({msg: 'error delete user'});
        else res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
})


export default router;