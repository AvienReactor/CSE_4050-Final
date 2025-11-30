const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');

router.get('/dashboard', requireAuth, (req, res) => {
    res.sendFile('dashboard.html', { root: './public' });
});

router.get('/dashboard', requireAuth, (req, res) => {
    res.sendFile('dashboard.html', { root: './public' });
});

router.get('/api/dashboard', requireAuth, (req, res) => {
    res.json({
        message: 'Dashboard data',
        user: req.session.user
    });
});

router.get('/api/dashboard/history', requireAuth, async (req, res) => {
    const { getQuizHistory } = require('../database');
    const history = await getQuizHistory(req.session.user.id);
    res.json(history);
});

module.exports = router;