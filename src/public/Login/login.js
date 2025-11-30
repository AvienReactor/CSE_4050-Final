// Listen for the login form submission
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get input values
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("error-message");

    // Retrieve stored users from localStorage (if any)
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Look for a user with matching credentials
    const user = storedUsers.find(
        (u) => u.username === username && u.password === password
    );

    // If user found -> log in and redirect
    if (user) {
        localStorage.setItem("loggedInUser", username); // Save Login session
        window.location.href = "../dashboard.html"; // Redirect to dashboard page
    }
    else {
        errorMessage.textContent = "Invalid username or password."; // If not found -> show error
    }

    try {
        // Send login data to server
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: username, password: password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("loggedInUser", username); // Save Login session
            errorMessage.color = "green";
            errorMessage.textContent = "Login successful! Redirecting...";
            window.location.href = "../dashboard.html"; // Redirect to dashboard page
        } else {
            errorMessage.color = "red";
            errorMessage.textContent = data.error || "Invalid email or password.";
        }
    } catch (error) {
        errorMessage.textContent = "Network error. Please try again later.";
    }
});