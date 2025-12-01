# Final for CSE 4050
## Requirements:
- Nodejs
- MYSQL

## Setup:
In order to run this website you must navigate the the projct in command prompt and execute ``` nodejs src/index.js ```.

To make the SQL:
```sql
CREATE DATABASE website;

USE website;

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

```

In order to add quizzes do the following and make changes as needed:
```sql
INSERT INTO quizzes (title, questions, answers) VALUES(
  '2nd Grade Math Quiz',
  JSON_ARRAY(
    'What is 82 + 3?',
    'What is 72 + 6?',
    'What is 75 - 25?',
    'What is 0 - 50?',
    'What is the missing number: 5, 10, __, 20, 25?',
    'What is the missing number: 15, 30, __, 60, 75?'
  ),
  JSON_ARRAY(
    '85',
    '78',
    '50',
    '0',
    '15',
    '45'
  )
);
```
Take the index of the quiz and add a button to the Math/Science/English/History page.
