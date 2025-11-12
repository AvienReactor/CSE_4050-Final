// Listen for the login form submission
document.getElementById("loginForm").addEventListener("submit", function (e) {
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
    if(user) {
        localStorage.setItem("loggedInUser", username); // Save Login session
        window.location.href = "../home.html"; // Redirect to home page
    }
    else {
        errorMessage.textContent = "Invalid username or password."; // If not found -> show error
    }

});