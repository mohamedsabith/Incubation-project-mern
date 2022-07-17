import express from 'express'

import {userSignup, userSignIn, userApplictionForm, userApplicationStatus, userApplicationExist} from '../controllers/userControllers.js'

import {adminSignIn, getAllApplications, approveApplication, declinedApplication, processApplication, getAllSlots, getAllApprovedApplication, slotAlocation} from '../controllers/adminControllers.js'


const router = express.Router();

//Api
router.get("/", (req, res) => res.send("API IS WORKING"));

//USER API
router.post('/signup',userSignup)
router.post('/signin',userSignIn)
router.post('/applictionFormSubmit',userApplictionForm)
router.get('/applicationStatus',userApplicationStatus)
router.get('/applicationExist',userApplicationExist)

//ADMIN API
router.post('/adminSignIn',adminSignIn)
router.get('/getApplication',getAllApplications)
router.post('/approveApplication',approveApplication)
router.post('/declinedApplication',declinedApplication)
router.post('/processApplication',processApplication)
router.get('/getAllSlots',getAllSlots)
router.get('/getApprovedApplication',getAllApprovedApplication)
router.post('/slotAlocation',slotAlocation)

export default router;