import { Router } from "express";
import { createOrder} from "../controllers/payment.controllers.js";
import {receiveWebhook} from "../controllers/webhook.controllers.js";
import path from 'path';


const router = Router()

router.post('/create-orden', createOrder);
router.post('/webhook', receiveWebhook );

router.get('/success', (req, res) => res.send('success'))


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/vista.js'));
});

export default router;