const mongoose=require('mongoose')

const dataSchema=new mongoose.Schema({
end_year:{type:String,default:""},
intensity:{type:Number,default:""},
sector:{type:String,default:""},
topic:{type:String,default:""},
insight:{type:String,default:""},
url:{type:String,default:""},
region:{type:String,default:""},
impact:{type:String,default:""},
added:{type:String,default:""},
published:{type:String,default:""},
country:{type:String,default:0},
relevance:{type:Number,default:""},
pestle:{type:String,default:""},
source:{type:String,default:""},
title:{type:String,default:""},
likelihood:{type:Number,default:0},

})

module.exports = mongoose.model("data",dataSchema)
