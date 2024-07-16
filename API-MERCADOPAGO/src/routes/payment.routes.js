import { Router } from "express";
import { createOrder, receiveWebhook } from "../controllers/payment.controllers.js"

const router = Router()

router.post('/create-orden', createOrder);

router.get('/success', (req, res) => res.send('success'))

router.get('/webhook', receiveWebhook )

export default router;