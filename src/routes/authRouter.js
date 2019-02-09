import express from 'express';
import jwt from 'jsonwebtoken';
const authRouter = express.Router();
const MetaAuth = require("meta-auth");
const metaAuth = new MetaAuth({
  banner: "Login to Furiosa"
});

authRouter.route('/:MetaAddress')
    .get( metaAuth, (req, res) => {
        // Request a message from the server
        if (req.metaAuth && req.metaAuth.challenge) {
            res.send(req.metaAuth.challenge);
        }
    });

authRouter.route('/:MetaMessage/:MetaSignature')
    .get( metaAuth, async (req, res) => {
        if (req.metaAuth && req.metaAuth.recovered) {
            // Signature matches the cache address/challenge
            // Authentication is valid, assign JWT, etc.

            await req.db.collection('Users').findOneAndUpdate(
                { address: req.metaAuth.recovered },
                { $setOnInsert: { address: req.metaAuth.recovered, name: '' } },
                { upsert: true, new: true, setDefaultsOnInsert: true },
                async (err, user) => {
                    const token = await jwt.sign(
                        {
                            payload: {
                                user: user._id,
                                address: user.address
                            }
                        },
                        process.env.SECRET,
                        { expiresIn: '1d' }
                    );
                    res.status(200).json({ success: 1, jwt: token, recovered: req.metaAuth.recovered });
                });

        } else {
            // Sig did not match, invalid authentication
            res.status(400).send();
        }
    });

export default authRouter;
