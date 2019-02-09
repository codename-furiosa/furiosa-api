require('dotenv').config();
import express from 'express';
import Archetype from 'archetype-js';
import UserType from '../models/user';
import jwt from 'express-jwt';
const userRouter = express.Router();

// Wrap an async function so we catch any errors that might occur
const wrapAsync = handler => (req, res) => handler(req)
.then(result => res.json(result))
.catch(error => res.status(500).json({ error: error.message }));

userRouter.route('/')
    .get( wrapAsync(async (req, res) => {
        return await req.db.collection('Users').find().sort({ _id: 1 }).toArray()
    }))
    .post( wrapAsync(async (req, res) => {
        try {
            const user = new UserType(req.body);
            await req.db.collection('Users').insertOne(user);
            return { user };
        } catch(error) {
            return(error);
        }
    }))

userRouter.route('/:address')
    .get( jwt({secret: process.env.SECRET}), wrapAsync(async (req, res) => {console.log("hit");
        return await req.db.collection('Users').findOne({ address: req.params.address.toLowerCase() })
    }))

export default userRouter;
