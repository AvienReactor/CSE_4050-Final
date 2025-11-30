async function loadDashboard() {
    const res = await fetch('/api/dashboard');

    if (!res.ok) {
        window.location.href = './Login/login.html';
        return;
    }

    const data = await res.json();
    document.getElementById('user-name').textContent = `${data.user.email}`;
}

async function loadQuizHistory() {
    const historyList = document.getElementById('history-list');

    const res = await fetch('/api/dashboard/history');
    if (!res.ok) {
        historyList.innerHTML = '<li>Error loading quiz history.</li>';
        return;
    }

    const data = await res.json();
    if (data.length === 0) {
        historyList.innerHTML = '<li>No quiz history available.</li>';
        return;
    }

    historyList.innerHTML = '';

    data.forEach((entry) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.quiz_title}: ${entry.score}/${entry.total} (${entry.percentage.toFixed(1)}%) — ${new Date(entry.taken_at).toLocaleString()}`;
        historyList.appendChild(listItem);
    });
}

function goToQuizPage(subject) {
    window.location.href = `./${subject}.html`;
}

document.getElementById('logout-button').addEventListener('click', async () => {
    await fetch('/logout', { method: 'POST' });
    window.location.href = './home.html';
});

loadDashboard();
loadQuizHistory();