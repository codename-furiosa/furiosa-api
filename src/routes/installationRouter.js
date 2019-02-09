import express from 'express';
import Archetype from 'archetype-js';
import InstallationType from '../models/installation';
const installationRouter = express.Router();

// Wrap an async function so we catch any errors that might occur
const wrapAsync = handler => (req, res) => handler(req)
.then(result => res.json(result))
.catch(error => res.status(500).json({ error: error.message }));

installationRouter.route('/')
    .get( wrapAsync(async (req, res) => {
        return await req.db.collection('Installations').find().sort({ _id: 1 }).toArray()
    }))

installationRouter.route('/:id')
    .get( wrapAsync(async (req, res) => {
        return await req.db.collection('Installations').findOne({ 'installation.id': parseInt(req.params.id) })
    }))
    .put( wrapAsync(async (req, res) => {
        const installation = new InstallationType(req.body);
        await req.db.collection('Installations').findOneAndUpdate(
            { 'installation.id': parseInt(req.params.id) },
            { $set:  installation },
            { 'upsert': true }
        );
    }))

export default installationRouter;
