const mongoose=require('mongoose')
const {Schema}=mongoose;

const adminSchema=new Schema({
    admin:{type:String},
    email:{type:String},
    password:{type:String},
    schoolName:{type:String},
    schooleAdress:{type:String},
    listOfTeachers:[{type:Schema.Types.ObjectId,ref:'teacher'}],



})

module.exports=mongoose.model('admin',adminSchema)