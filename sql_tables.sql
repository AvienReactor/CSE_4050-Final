CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    pass VARCHAR(255) NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO quizzes (title, questions, answers) VALUES(
    '2nd Grade Math Quiz',
    JSON_ARRAY('What is 82 + 3?', 'What is 72 + 6?', 'What is 75 - 25?', 'What is 0 - 50?', 'What is the missing number: 5, 10, __, 20, 25?', 'What is the missing number: 15, 30, __, 60, 75?'),
    JSON_ARRAY('85', '78', '50', '0', '15', '45')
);

UPDATE quizzes 
SET title = '2nd Grade Math Quiz' 
WHERE id = 3;

UPDATE quizzes 
SET questions = JSON_ARRAY(
    'What is 45 + 23?',
        'What is 78 - 35?',
        'What is 4 multiplied by 2?',
        'What is the value of the digit 6 in the number 167?',
        'Round 58 to the nearest ten.',
        'How many cents are in three quarters?',
        'What is the missing number in the pattern: 10, 20, __, 40, 50?',
        'A triangle has sides of length 4 cm, 5 cm, and 6 cm. What is its perimeter?',
        'What is 100 - 40?',
        'How many equal halves are in one whole?'
),
answers = JSON_ARRAY(
    '68',
    '43',
    '8',
    '60',
    '60',
    '75',
    '30',
    '15 cm',
    '60',
    '2'
)
WHERE id = 3;