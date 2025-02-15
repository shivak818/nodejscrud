const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});

const courseModel = mongoose.model('courses', courseSchema);

module.exports = courseModel;
