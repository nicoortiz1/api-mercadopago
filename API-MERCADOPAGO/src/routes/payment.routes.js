import { Router } from "express";
import { createOrder } from "../controllers/payment.controllers.js"

const router = Router()

router.get('/create-orden', createOrder);

router.get('/success', (req, res) => res.send('success'))

router.get('/webhook', (req, res) => res.send('webhook'))

export default router;