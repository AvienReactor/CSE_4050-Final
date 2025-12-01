// Listen for the sign-up form submission
document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Stop page refresh

    // Grab all input values
    const newUsername = document.getElementById("newUsername").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const message = document.getElementById("signup-message");

    // Check if username is valid
    const usernameRequirment = /^[a-zA-Z0-9]{5,50}$/;
    if (!usernameRequirment.test(newUsername)) {
        message.style.color = "red";
        message.textContent = "Please enter a valid username. Must be between 5 and 50 characters, letters and numbers only.";
        return;
    }

    // Check if password is valid
    const passwordRequirment = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/;
    if (!passwordRequirment.test(newPassword)) {
        message.style.color = "red";
        message.textContent = "Please enter a valid password. Must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.";
        return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
        message.style.color = "red";
        message.textContent = "Passwords do not match.";
        return;
    }

    // Get existing users from localStorage (or empty array if none)
    // let users = JSON.parse(localStorage.getItem("users")) || [];


    // Check if username already exists
    // const existingUser = users.find((u) => u.username === newUsername);
    // if (existingUser) {
    //     message.style.color = "red";
    //     message.textContent = "Username already exists.";
    //     return;
    // }

    try {
        // Send signup data to server
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: newUsername, password: newPassword })
        });

        const data = await response.json();

        if (response.ok) {
            message.style.color = "green";
            message.textContent = "Account created successfully! Redirecting to login...";
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        } else {
            message.style.color = "red";
            message.textContent = data.error || "username already exists.";
            return;
        }
    } catch (error) {
        message.style.color = "red";
        message.textContent = "Network error. Please try again later.";
        return;
    }

    // Add new user to localStorage
    // users.push({ username: newUsername, password: newPassword });
    // localStorage.setItem("users", JSON.stringify(users));

    // Display success message
    // message.style.color = "green";
    // message.textContent = "Account created successfully! Redirecting to login...";

    // Redirect back to login page after short delay
    // setTimeout(() => {
    //     window.location.href = "login.html";
    // }, 1500);
});
