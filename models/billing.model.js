const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let billingSchema = new Schema({
    productname: {type: String, required: true, max: 100},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
    total:{type:Number,required: true},
    cgst:{type:Number,required: true},
    sgst:{type:Number,required: true},
    finalamount:{type:Number,required: true}


});
module.exports = mongoose.model('billing', billingSchema);