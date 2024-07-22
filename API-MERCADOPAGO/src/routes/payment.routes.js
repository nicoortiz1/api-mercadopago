import { Router } from "express";
import { createOrder, receiveWebhook} from "../controllers/payment.controllers.js";
import path from 'path';


const router = Router()

router.post('/create-orden', createOrder);

router.get('/success', (req, res) => res.send('success'))

router.post('/webhook', receiveWebhook )

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/vista.js'));
});

export default router;