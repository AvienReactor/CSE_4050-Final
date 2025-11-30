CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    pass VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quizzes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    questions JSON NOT NULL,
    answers JSON NOT NULL
);

CREATE TABLE quiz_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    quiz_id INT NOT NULL,
    quiz_title VARCHAR(100) NOT NULL,
    score INT NOT NULL,
    total INT NOT NULL,
    percentage FLOAT NOT NULL,
    taken_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

INSERT INTO quizzes (title, questions, answers) VALUES(
    'Math Quiz',
    JSON_ARRAY('What is 2 + 2?', 'What is 5 * 5?'),
    JSON_ARRAY('4', '25')
);