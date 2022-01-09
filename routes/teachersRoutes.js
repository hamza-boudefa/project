const express=require('express')
const Router=express.Router()
const {addNewTeacher,getTeacher,getTeachersList,updateTeacher,deleteTeacher,logIn}=require('../controllers/teacherControllers')
const teacherMiddleware=require('../middlewares/teacherMiddleware')
const adminMiddleware=require('../middlewares/adminMiddleware')


Router.post('/addNewTeacher',adminMiddleware ,addNewTeacher)
Router.post('/login',logIn)
Router.get('/:id',getTeacher) 
Router.get('/',getTeachersList)
Router.put('/:id',teacherMiddleware,updateTeacher)
Router.delete('/:id', teacherMiddleware,deleteTeacher) 
 

module.exports=Router 