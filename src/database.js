const mysql = require('mysql2/promise')
const bcrypt = require('bcrypt')
require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

async function getUsers() {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
}

async function getUser(id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
}

async function createUser(username, password) {
    const existingUser = await findUser(username);
    if (existingUser) {
        throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query('INSERT INTO users (username, pass) VALUES (?, ?)', [username, hashedPassword]);
    return result.insertId;
}

async function findUser(username) {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
}

async function verifyUser(username, password) {
    const user = await findUser(username);
    const isPasswordValid = await bcrypt.compare(password, user.pass);
    return isPasswordValid;
}

function ensureArray(value) {
    if (Array.isArray(value)) {
        return value;
    }

    if (value == null) {
        return [];
    }

    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (!trimmed) {
            return [];
        }

        try {
            const parsed = JSON.parse(trimmed);
            if (Array.isArray(parsed)) {
                return parsed;
            }
            return [String(parsed)];
        } catch (e) {
            return [trimmed];
        }
    }
    return [String(value)];
}

async function getQuizJson(quizId) {
    const [rows] = await pool.query('SELECT id, title, questions FROM quizzes WHERE id = ?', [quizId]);
    const row = rows[0];
    if (!row) { return null; }
    const questions = ensureArray(row.questions);
    return { id: row.id, title: row.title, questions };
}

async function gradeQuiz(quizId, userAnswers) {
    const [rows] = await pool.query('SELECT questions, answers FROM quizzes WHERE id = ?', [quizId]);
    const row = rows[0];
    if (!row) { return null; }

    const questions = ensureArray(row.questions);
    const correctAnswers = ensureArray(row.answers);
    const total = questions.length;
    let score = 0;

    for (let i = 0; i < total; i++) {
        const userAnswer = ((userAnswers[i] ?? '')).toString().trim().toLowerCase();
        const correctAnswer = ((correctAnswers[i] ?? '')).toString().trim().toLowerCase();
        if (userAnswer === correctAnswer) {
            score++;
        }
    }
    return { score, total, percentage: total > 0 ? (score / total * 100) : 0 };
    // add storing the result in the user later
}

async function saveQuizHistory(userId, quizId, quizTitle, score, total, percentage) {
    const [result] = await pool.query(
        `INSERT INTO quiz_history (user_id, quiz_id, quiz_title, score, total, percentage)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, quizId, quizTitle, score, total, percentage]
    );
    return result.insertId;
}

async function getQuizHistory(userId) {
    const [rows] = await pool.query(
        'SELECT * FROM quiz_history WHERE user_id = ? ORDER BY taken_at DESC',
        [userId]
    );
    return rows;
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    findUser,
    verifyUser,
    getQuizJson,
    gradeQuiz,
    saveQuizHistory,
    getQuizHistory,
    pool
};

// (async () => {
//     const users = await createUser('test@example.com', 'password123');
//     console.log(users);
// })();