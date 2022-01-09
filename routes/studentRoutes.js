const express=require('express')
const Router=express.Router()
const {addNewStudent,logIn,getStudentsList,getStudent,deleteStudent,updateStudent}=require('../controllers/studentControllers')
const studentMiddleware=require('../middlewares/studentMiddleware')
const adminMiddleware=require('../middlewares/adminMiddleware')

Router.post('/addStudent', addNewStudent)
Router.post('/logIn',logIn)
Router.get('/getStudentsList', getStudentsList)
Router.get('/getStudent/:id',getStudent)
Router.delete('/deleteStudent/:id',adminMiddleware, deleteStudent)
Router.put('/updateStudent/:id', updateStudent) 

module.exports=Router 