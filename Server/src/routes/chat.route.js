import express from 'express';
import { accessChat, fetchChat, createGroupChat, renameGroup, removeFromGroup, addToGroup } from '../controllers/chat.controller.js'


const router = express.Router();

router.route('/').post(accessChat)
                 .get(fetchChat);
router.route('/group').post(createGroupChat);
router.route('/rename').put(renameGroup);
router.route('/group-remove').put(removeFromGroup);
router.route('/group-add').put(addToGroup);

export default router;