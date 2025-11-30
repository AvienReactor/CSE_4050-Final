const express = require('express');
const { createUser } = require('../database');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const result = await createUser(email, password);
        res.status(201).json({ message: 'User created', userId: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;