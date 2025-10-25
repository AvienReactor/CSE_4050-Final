// Listen for the sign-up form submission
document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Stop page refresh

    // Grab all input values
    const newUsername = document.getElementById("newUsername").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const message = document.getElementById("signup-message");

    // Check if passwords match
    if (newPassword !== confirmPassword) {
        message.style.color = "red";
        message.textContent = "Passwords do not match.";
        return;
    }

    // Get existing users from localStorage (or empty array if none)
    let users = JSON.parse(localStorage.getItem("users")) || [];

    
    // Check if username already exists
    const existingUser = users.find((u) => u.username === newUsername);
    if (existingUser) {
        message.style.color = "red";
        message.textContent = "Username already exists.";
        return;
    }


    // Add new user to localStorage
    users.push({ username: newUsername, password: newPassword });
    localStorage.setItem("users", JSON.stringify(users));

    // Display success message
    message.style.color = "green";
    message.textContent = "Account created successfully! Redirecting to login...";

    // Redirect back to login page after short delay
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
});
