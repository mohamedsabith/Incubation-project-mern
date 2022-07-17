import axios from "axios";

const url = 'http://localhost:5000/api';

//user api
export const userSignup = (userData) => axios.post(`${url}/signup`,userData)
export const userSignin = (userData) => axios.post(`${url}/signin`,userData)
export const userApplicationForm = (formData) => axios.post(`${url}/applictionFormSubmit`,formData)
export const applicationStatus = (userId) =>  axios.get(`${url}/applicationStatus?userId=${userId}`)
export const applicationExist = (userId) => axios.get(`${url}/applicationExist?userId=${userId}`)


//admin api
export const adminSignin = (adminData) =>  axios.post(`${url}/adminSignIn`,adminData)
export const getAllApplications = () => axios.get(`${url}/getApplication`)
export const approveApplication = (id) => axios.post(`${url}/approveApplication`,{applicationId:id})
export const declinedApplication = (id) => axios.post(`${url}/declinedApplication`,{applicationId:id})
export const processApplication = (id) => axios.post(`${url}/processApplication`,{applicationId:id})
export const getAllSlots = () => axios.get(`${url}/getAllSlots`)
export const getAllApprovedApplication = () => axios.get(`${url}/getApprovedApplication`)
export const slotAlocation = (applicationId,slotId) => axios.post(`${url}/slotAlocation`,{application:applicationId,slot:slotId})