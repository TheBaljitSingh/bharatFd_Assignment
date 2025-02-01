import express from 'express'
import {getAllFaq, createFaq, getSingleFaq} from "../controller/faqController.js"


const router = express.Router();

router.route("/faqs").get(getAllFaq)
router.route("/faqs").post(createFaq);
router.route("/faqs/:faqId").get(getSingleFaq);

export default router;