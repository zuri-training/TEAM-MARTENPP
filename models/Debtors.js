const { Schema, model } = require('mongoose');
const SchoolModel = require('../models/School');

const debtorSchema = new Schema( {
    firstName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    middleName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    debt: {
        type: Number,
    },
    dateJoined: {
        type: String,
    },
    exitDate: {
        type: String,
    },
    School:[{
        type: Schema.Types.ObjectId,
        ref: SchoolModel,
    }],
}, {timestamps: true});

const DebtorModel = model("Debtor", debtorSchema);
module.exports = DebtorModel; //Export the schema to be used in other files