import express from 'express';
import { userSignup, userSignin, userSignout, getProfile, allUsers, searchedUsers } from '../controllers/user.controllers.js'
const router = express.Router();


// router.get('/test', testConfig);
router.post('/sign-up', userSignup);
router.post('/sign-in', userSignin);
router.post('/sign-out', userSignout);
router.get('/user', searchedUsers);
router.get('/profile', getProfile);
router.get('/allContacts', allUsers)


export default router;
