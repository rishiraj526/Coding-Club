const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const { options } = require('../routes/studentRoutes');
const { text } = require('express');

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    semester: {
        type: Number,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Adding passport-local-mongoose plugin to the schema

studentSchema.plugin(passportLocalMongoose);

const studentModel = mongoose.model("studentModel", studentSchema);
module.exports = studentModel;