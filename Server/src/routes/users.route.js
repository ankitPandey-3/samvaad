import express from 'express';
import { userSignup, userSignin, userSignout, getProfile, allUsers } from '../controllers/user.controllers.js'
const router = express.Router();


// router.get('/test', testConfig);
router.post('/sign-up', userSignup);
router.post('/sign-in', userSignin);
router.post('/sign-out', userSignout);
router.get('/user', allUsers);
router.get('/profile', getProfile);


export default router;
