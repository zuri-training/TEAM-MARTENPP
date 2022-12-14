const { Schema, model } = require('mongoose');
const DebtorModel = require('./Debtors');

const schoolSchema = new Schema( {
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 8,
    },
    location: {
        type: String,
        required: true,
        maxlength: 50,
    },
    isUser: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
    },
    Debtors: [
        {
            type: Schema.Types.ObjectId,
            ref: DebtorModel,
        },
    ],
}, {timestamps: true});

const SchoolModel = model("School", schoolSchema);
module.exports = SchoolModel; //Export the schema to be used in other files