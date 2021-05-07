import express from 'express';
import dotenv  from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js'
import { ErrorHandler, NotFound } from './middleware/errorMiddleware.js';

import productRoutes from './routes/productRoutes.js'


dotenv.config();
connectDB();

const app= express();

app.use('/api/products',productRoutes)

app.use(NotFound)

app.use(ErrorHandler)

const PORT = process.env.PORT || 5000
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))