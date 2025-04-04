

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';  
// import authJwt from './helper/jwt.js';

const app = express();

app.use(cors());
app.options('*', cors());

//middleware
app.use(bodyParser.json());
app.use(express.json());
// app.use(authJwt());

//Routes
import productRoutes from './routes/products.js';
import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js';
import myListSchema from './routes/myList.js';
import paymentRoutes from './routes/payment.js';
import paymentHistoryRoutes from './routes/paymentRoutes.js';
import statsRoutes from "./routes/stats.js";


app.use(`/api/products`, productRoutes);
app.use(`/api/user`, userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/my-list', myListSchema);
app.use("/api/payment", paymentRoutes);
app.use("/api/payment-history", paymentHistoryRoutes);
app.use("/api/stats", statsRoutes);

// Connect to the Database
mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('Database Connection is ready...');
        // Start the server
        app.listen(process.env.PORT, () => {
            console.log(`Server is running at http://localhost:${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });







