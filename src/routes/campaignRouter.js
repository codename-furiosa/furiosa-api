import express from 'express';
import Archetype from 'archetype-js';
import CampaignType from '../models/campaign';
const campaignRouter = express.Router();

// Wrap an async function so we catch any errors that might occur
const wrapAsync = handler => (req, res) => handler(req)
.then(result => res.json(result))
.catch(error => res.status(500).json({ error: error.message }));

campaignRouter.route('/')
    .get( wrapAsync(async (req, res) => {
        return await req.db.collection('Campaigns').find(req.query).sort({ _id: 1 }).toArray()
    }))
    .post( wrapAsync(async (req, res) => {
        try {
            const campaign = new CampaignType(req.body);
            await req.db.collection('Campaigns').insertOne(campaign);
            return { campaign };
        } catch(error) {
            return(error);
        }
    }))
    .patch( wrapAsync(async (req, res) => {
        await req.db.collection('Campaigns').findOneAndUpdate(
            req.query,
            { $set: req.body }
        );
    }))

campaignRouter.route('/:address')
    .get( wrapAsync(async (req, res) => {
        return req.db.collection('Campaigns').findOne({ address: req.params.address })
    }))

export default campaignRouter;
