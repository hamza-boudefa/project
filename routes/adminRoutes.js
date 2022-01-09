const express=require('express')
const Router=express.Router()
const {addAdmin,getAdmin,getOneAdmin,deleteAdmin,updateAdmin,logInAdmin}=require('../controllers/adminControllers')
const adminMiddleware=require('../middlewares/adminMiddleware')


Router.post('/addAdmin', addAdmin)
Router.post('/login',logInAdmin)
Router.get('/getAdmin', getAdmin)
Router.get('/getAdmin/:id',getOneAdmin)
Router.put('/updateAdmin/:id',adminMiddleware ,updateAdmin)
Router.delete('/deleteAdmin/:id',adminMiddleware, deleteAdmin)


module.exports=Router