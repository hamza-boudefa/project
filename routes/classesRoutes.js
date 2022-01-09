const express=require('express')
const Router=express.Router()
const {addNewClasse,updateClasse,deleteClasse,getClasse,getClassesList,removeStudent,removeTeacher,addStudents,addTeachers}=require('../controllers/ClassesControllers')
const adminMiddleware=require('../middlewares/adminMiddleware')

Router.post('/addClasse',addNewClasse)
Router.get('/getClasse/',getClasse)
Router.get('/getClassesList',getClassesList)
Router.put('/updateClasse/:id',updateClasse)
Router.delete('/deleteClasse/:id',deleteClasse)
Router.put('/updateClassList/student/:classId/:studentId',removeStudent)
Router.put('/updateClassList/teacher/:classId/:teacherId',removeTeacher)
Router.put('/updateClassList/addTeacher/:classId/:teacherId',addTeachers)
Router.put('/updateClassList/addStudnet/:classId/:studentId',addStudents)

module.exports=Router