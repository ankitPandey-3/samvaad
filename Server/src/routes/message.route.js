import { Router } from "express";
import { allMessages, sendMessages } from "../controllers/message.controller.js"
const router = Router();

router.route("/:chatId").get(allMessages);
router.route("/").post(sendMessages);

export default router;