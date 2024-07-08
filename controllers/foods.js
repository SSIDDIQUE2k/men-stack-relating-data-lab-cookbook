// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// router logic will go here - will be built later on in the lab
router.get('/', (req, res) => {
    res.render('foods/index.ejs')
  });
  router.get('/new', (req, res) => {
    res.render(' foods/new.ejs')
  });

router.post('/', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);     
        user.foods.push(req.body);
        await user.save();
        res.redirect(`/users/${req.params.userId}/foods`);
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});
router.get('/:userId/foods/:itemId/edit', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const food = user.foods.id(req.params.itemId);
        if (!food) {
            throw new Error('Food not found');
        }
        res.render('foods/edit.ejs', { food });
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});
router.post('/:userId/foods/:itemId?_method=PUT', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const food = user.foods.id(req.params.itemId);
        if (!food) {
            throw new Error('Food not found');
        }
        food.set(req.body);
        await user.save();
        res.redirect(`/users/${req.params.userId}/foods`);
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});
  router.delete('/:userId/foods/:itemId', async (req, res) => {
    try {
      const user    = await User.findById(req.params.userId);
        user.foods.id(req.params.itemId).remove();
        await user.save();
        res.redirect(`/users/${req.params.userId}/foods`);
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
    



module.exports = router;
