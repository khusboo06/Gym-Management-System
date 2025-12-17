const mongoose = require("mongoose");
const { type } = require("os");

const MembershipSchema=mongoose.Schema({
    months:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    gym:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"gym",
        required:true,
    }
},{timestamp:true})

const modalMembership = mongoose.model("membership",MembershipSchema);

module.exports = modalMembership;