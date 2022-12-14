const { Schema, model } = require('mongoose');
const SchoolModel = require('../models/School');

const debtorSchema = new Schema( {
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    debt: {
        type: Number,
        required: true,
    },
    School:[{
        type: Schema.Types.ObjectId,
        ref: SchoolModel,
    }],
}, {timestamps: true});

const DebtorModel = model("Debtor", debtorSchema);
module.exports = DebtorModel; //Export the schema to be used in other files