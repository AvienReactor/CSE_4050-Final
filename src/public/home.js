window.addEventListener('DOMContentLoaded', async () => {
    const userLinks = document.querySelectorAll('.user-link');
    const dashboardLink = document.getElementById('dashboard-link');

    try {
        const res = await fetch('/session', { method: 'GET', headers: { 'Content-Type': 'application/json' } });

        const data = await res.json();

        if (data.loggedIn) {
            userLinks.forEach(link => link.style.display = 'none');
            dashboardLink.style.display = 'inline';
        } else {
            userLinks.forEach(link => link.style.display = 'inline');
            dashboardLink.style.display = 'none';
        }
    }
    catch (error) {
        console.error('Error checking session status:', error);
        userLinks.forEach(link => link.style.display = 'inline');
        dashboardLink.style.display = 'none';
    }
});