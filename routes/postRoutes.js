const express=require('express')
const Router=express.Router()
const {addNewPost,updatePost,deletePost}=require('../controllers/postControllers')
const teacherMiddleware=require('../middlewares/teacherMiddleware')

Router.post('/addPost',teacherMiddleware,addNewPost)
Router.put('/updatePost/:id',teacherMiddleware,updatePost)
Router.delete('/deletePost/:id',teacherMiddleware,deletePost)


module.exports=Router