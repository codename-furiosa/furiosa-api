import express from 'express';
import Archetype from 'archetype-js';
import ContractType from '../models/contract';
const contractRouter = express.Router();

// Wrap an async function so we catch any errors that might occur
const wrapAsync = handler => (req, res) => handler(req)
.then(result => res.json(result))
.catch(error => res.status(500).json({ error: error.message }));

contractRouter.route('/')
    .get( wrapAsync(async (req, res) => {
        return await req.db.collection('Contracts').find(req.query).sort({ _id: 1 }).toArray();
    }))
    .post( wrapAsync(async (req, res) => {
        try {
            const contract = new ContractType(req.body);
            await req.db.collection('Contracts').insertOne(contract);
            return { contract };
        } catch(error) {
            return(error);
        }
    }))

contractRouter.route('/:address')
    .get( wrapAsync(async (req, res) => {
        return req.db.collection('Contracts').findOne({ address: req.params.address })
    }))

export default contractRouter;
