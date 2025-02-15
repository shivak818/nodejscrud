const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const courseModel = require('./models/course');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Get all courses
app.get('/course', async (req, res) => {
    try {
        const courses = await courseModel.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single course
app.get('/course/:id', async (req, res) => {
    try {
        const course = await courseModel.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Create a new course
app.post('/course', async (req, res) => {
    const { title, description } = req.body;
    
    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    try {
        const newCourse = new courseModel({ title, description });
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a course
app.patch('/course/:id', async (req, res) => {
    try {
        const updatedCourse = await courseModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(updatedCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a course (Fixed method from GET to DELETE)
app.delete('/course/:id', async (req, res) => {
    try {
        const deletedCourse = await courseModel.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = app;
