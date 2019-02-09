require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import campaignRouter from './routes/campaignRouter';
import contractRouter from './routes/contractRouter';
import freelancerRouter from './routes/freelancerRouter';
import contributionRouter from './routes/contributionRouter';
import installationRouter from './routes/installationRouter';
import authRouter from './routes/authRouter';
import userRouter from './routes/userRouter';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8080;

// connect to database
mongoose.connect(process.env.MONGOLAB_WHITE_URI || process.env.MONGODB_URI, { useNewUrlParser: true });
let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use((req, res, next) => {
    // Expose the MongoDB database handle
    req.db = db;
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO: CORS Restrictions - Remember to account for Mobile
app.use(cors());

// routes
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/api/campaigns', campaignRouter);
app.use('/api/contracts', contractRouter);
app.use('/api/contributions', contributionRouter);
app.use('/api/freelancers', freelancerRouter);
app.use('/api/installations', installationRouter);

app.listen(port, (err) => {
    if(err) throw err;
    console.log(`Ready on http://localhost:${port}`)
})
