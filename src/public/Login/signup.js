// Listen for the sign-up form submission
document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Stop page refresh

    // Grab all input values
    const newUsername = document.getElementById("newUsername").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const message = document.getElementById("signup-message");

    // Check if email is valid
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(newUsername)) {
        message.style.color = "red";
        message.textContent = "Please enter a valid email address.";
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
            body: JSON.stringify({ email: newUsername, password: newPassword })
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
            message.textContent = data.error || "email already exists.";
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
