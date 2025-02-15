const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const MarioChar = require('./models/marioChar'); // Consistent naming

// Middlewares
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET all Mario characters
app.get('/mario', async (req, res) => {
    try {
        const characters = await MarioChar.find();
        res.json(characters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET Mario character by ID
app.get('/mario/:id', async (req, res) => {
    try {
        const character = await MarioChar.findById(req.params.id);
        if (!character) {
            return res.status(400).json({ message: "Character not found" });
        }
        res.json(character);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST a new Mario character
app.post('/mario', async (req, res) => {
    const { name, weight } = req.body;
    if (!name || !weight) {
        return res.status(400).json({ message: "Either name or weight is missing" });
    }

    try {
        const newCharacter = new MarioChar({ name, weight });
        await newCharacter.save();
        res.status(201).json(newCharacter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PATCH update a Mario character by ID
app.patch('/mario/:id', async (req, res) => {
    try {
        const updatedCharacter = await MarioChar.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCharacter) {
            return res.status(400).json({ message: "Character not found" });
        }
        res.json(updatedCharacter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a Mario character by ID
app.delete('/mario/:id', async (req, res) => {
    try {
        const deletedCharacter = await MarioChar.findByIdAndDelete(req.params.id);
        if (!deletedCharacter) {
            return res.status(400).json({ message: "Character not found" });
        }
        res.json({ message: "Character deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = app;
