import express from 'express';
import Archetype from 'archetype-js';
import ContributionType from '../models/contribution';
const contributionRouter = express.Router();

// Wrap an async function so we catch any errors that might occur
const wrapAsync = handler => (req, res) => handler(req)
.then(result => res.json(result))
.catch(error => res.status(500).json({ error: error.message }));

contributionRouter.route('/')
    .get( wrapAsync(async (req, res) => {
        return await req.db.collection('Contributions').find(req.query).sort({ _id: 1 }).toArray()
    }))
    .post( wrapAsync(async (req, res) => {
        try {
            const contribution = new ContributionType(req.body);
            await req.db.collection('Contributions').insertOne(contribution);
            return { contribution };
        } catch(error) {
            return(error);
        }
    }))

contributionRouter.route('/:address')
    .get( wrapAsync(async (req, res) => {
        return await req.db.collection('Contributions').findOne({ address: req.params.address })
    }))

export default contributionRouter;
