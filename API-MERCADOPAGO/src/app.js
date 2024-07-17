import express from 'express';
import morgan from 'morgan';
import paymentRoutes from './routes/payment.routes.js';
import { PORT } from './config.js';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(morgan('dev'));
app.use(express.json());

app.use(paymentRoutes)

app.listen(PORT)
console.log('Server on port', PORT) 