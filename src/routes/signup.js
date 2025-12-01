const express = require('express');
const { createUser } = require('../database');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const result = await createUser(username, password);
        res.status(201).json({ message: 'User created', userId: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;