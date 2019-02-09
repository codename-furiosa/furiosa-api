import express from 'express';
import Archetype from 'archetype-js';
import FreelancerType from '../models/freelancer';
const freelancerRouter = express.Router();

// Wrap an async function so we catch any errors that might occur
const wrapAsync = handler => (req, res) => handler(req)
.then(result => res.json(result))
.catch(error => res.status(500).json({ error: error.message }));

freelancerRouter.route('/')
    .get( wrapAsync(async (req, res) => {
        return await req.db.collection('Freelancers').find().sort({ _id: 1 }).toArray()
    }))
    .post( wrapAsync(async (req, res) => {
        try {
            const freelancer = new FreelancerType(req.body);
            await req.db.collection('Freelancers').insertOne(freelancer);
            return { freelancer };
        } catch(error) {
            return(error);
        }
    }))

freelancerRouter.route('/:address')
    .get( wrapAsync(async (req, res) => {
        return await req.db.collection('Freelancers').findOne({ address: req.params.address })
    }))

export default freelancerRouter;
