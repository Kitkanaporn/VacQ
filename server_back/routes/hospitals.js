const express = require('express');
const {getHospitals, getHospital, createHospital, updateHospital, deleteHospital} = require('../controllers/hospitals') ;
const appointmentRouter = require('./appointments') ;


const router = express.Router() ;
const {protect,authorize} = require('../middleware/auth') ; //.. = การออกไปข้างนอกก่อน

router.use('/:hospitalId/appointments' , appointmentRouter) ; //mergeParams to get hospitalId from parent router

//define how to route do when get , post , put , delete
router.route('/').get(getHospitals).post(protect ,authorize("admin") , createHospital) ;
router.route('/:id').get(getHospital).put(protect ,authorize("admin"), updateHospital).delete(protect ,authorize("admin"), deleteHospital) ;

module.exports = router ;