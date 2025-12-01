const express = require('express');
const { verifyUser, findUser } = require('../database');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const isValid = await verifyUser(username, password);
        if (!isValid) {
            res.status(401).json({ error: 'Invalid username or password' });
        }
        const user = await findUser(username);
        req.session.user = { id: user.id, username: user.username };
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.clearCookie('connect.sid');
            res.status(200).json({ message: 'Logout successful' });
        }
    });
});

router.get('/session', (req, res) => {
    if (req.session.user && req.session) {
        return res.json({
            loggedIn: true,
            user: req.session.user
        });
    }

    res.json({ loggedIn: false });
})

module.exports = router;