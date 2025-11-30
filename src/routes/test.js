const express = require('express');
const router = express.Router();
const { getQuizJson, gradeQuiz, saveQuizHistory } = require('../database');

router.get('/api/quiz/:quizId', async (req, res) => {
    const quizId = parseInt(req.params.quizId, 10);
    if (Number.isNaN(quizId)) {
        return res.status(400).json({ error: 'Invalid quiz ID' });
    }
    try {
        const quiz = await getQuizJson(quizId);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (error) {
        console.error('Error in GET /api/quiz/:quizId:', error);
        res.status(500).json({ error: 'Failed to retrieve quiz' });
    }
});

router.post('/api/quiz/:quizId/submit', async (req, res) => {
    const quizId = parseInt(req.params.quizId, 10);
    if (Number.isNaN(quizId)) {
        return res.status(400).json({ error: 'Invalid quiz ID' });
    }
    const { answers } = req.body;
    if (!Array.isArray(answers)) {
        return res.status(400).json({ error: 'Answers must be provided as an array' });
    }
    try {
        const result = await gradeQuiz(quizId, answers);
        if (!result) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        const quiz = await getQuizJson(quizId);
        if (req.session && req.session.user) {
            await saveQuizHistory(
                req.session.user.id,
                quizId,
                quiz.title,
                result.score,
                result.total,
                result.percentage
            );
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;