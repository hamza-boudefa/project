const mongoose=require('mongoose')
const connectDB=async()=>{
    try {
        mongoose.connect(process.env.URI_DB)
        console.log('db connected succssefully')
    } catch (error) {
        console.log(err)
    }
}
module.exports=connectDB