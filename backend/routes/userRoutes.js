import express from 'express';
import {authUser, 
    getUserProfile,
     registerUser,
     updateUserProfile,
     getUsers,
     deleteUser,
     getUserById,
     updateUser
    } from '../controllers/userController.js';

import {protect, admin} from '../middleware/authMiddleware.js'
const router = express();


router.route('/')
.post(registerUser)
.get(protect,admin, getUsers)


router.route('/login').post(authUser)
router.route('/profile').put(protect,updateUserProfile)
router.route('/profile').get(protect,getUserProfile)
router.route('/:id')
.delete(protect,admin,deleteUser)
.get(protect, admin, getUserById)
.put(protect, admin, updateUser)

export default router;