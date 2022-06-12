const { type } = require("express/lib/response");
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        username: {type: String, required : true, unique: true},
        address: {type: String, required: true, unique: true},
        // link:  [{
        //     type: String
        // }],
        // upLink : [address={type: String, default: null}, link= {type: String, required: true}],
        // level1:  {link: {type: String, },address:{type:String, defalult: null}, value: {type: Number, default: 0.2}},
        // level2:  {link: {type: String, },address:{type:String, defalult: null}, value: {type: Number, default: 0.1}},
        // level3:  {link: {type: String, },address:{type:String, defalult: null}, value: {type: Number, default: 0.1}},
        // level4:  {link: {type: String, },address:{type:String, defalult: null}, value: {type: Number, default: 0.05}},
        // level5:  {link: {type: String, },address:{type:String, defalult: null}, value: {type: Number, default: 0.05}},

        refferal: [ {link: {type:String},address:{type:String, default:null}, value: {type: Number, default: 0.2}}, {link: {type: String, },address:{type:String, default: null}, value: {type: Number, default: 0.1}}, {link: {type: String, },address:{type:String, defalult: null}, value: {type: Number, default: 0.1}}, {link: {type: String, },address:{type:String, defalult: null}, value: {type: Number, default: 0.1}}, {link: {type: String, },address:{type:String, defalult: null}, value: {type: Number, default: 0.1}}]
        
    },
    {timestamps : true} 
);

module.exports =  mongoose.model("User", UserSchema);