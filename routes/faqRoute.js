import express from 'express'
import {getAllFaq} from "../controller/faqController.js"


const router = express.Router();

router.route("/faqs").get(getAllFaq)


export default router;