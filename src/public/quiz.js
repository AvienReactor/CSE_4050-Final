function getQuizIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('quizId');
}

async function loadQuiz() {
  const quizId = getQuizIdFromUrl();
  const titleElement = document.getElementById('test-title');
  const questionsContainer = document.getElementById('questions-container');

  if (!quizId) {
    titleElement.textContent = 'Quiz ID not provided in URL.';
    return;
  }

  try {
    const res = await fetch(`/api/quiz/${quizId}`);
    if (!res.ok) {
      titleElement.textContent = 'Quiz not found';
      return;
    }
    const quiz = await res.json();

    titleElement.textContent = quiz.title;
    questionsContainer.innerHTML = '';

    quiz.questions.forEach((q, index) => {
      const questionDiv = document.createElement('div', id = 'question2');
      questionDiv.className = 'question';

      const label = document.createElement('label');
      label.textContent = `${index + 1}. ${q}`;

      const input = document.createElement('input');
      input.type = 'text';
      input.name = `answer-${index}`;
      input.required = true;

      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement('br'));
      questionDiv.appendChild(input);

      questionsContainer.appendChild(questionDiv);
    });
  } catch (err) {
    titleElement.textContent = 'Error loading quiz.';
    console.error('Error fetching quiz:', err);
  }
}

document.getElementById('quiz-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const quizId = getQuizIdFromUrl();
  const resultElement = document.getElementById('result');

  const inputs = document.querySelectorAll('[name^="answer-"]');
  const answers = Array.from(inputs).map(input => input.value.trim());

  try {
    const res = await fetch(`/api/quiz/${quizId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ answers })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      resultElement.textContent = err.error || 'Error submitting quiz.';
      return;
    }

    const data = await res.json();
    resultElement.textContent = `Score: ${data.score} / ${data.total} (${data.percentage.toFixed(1)}%)`;
  } catch (err) {
    resultElement.textContent = 'Network error submitting quiz.';
  }
});

loadQuiz();
