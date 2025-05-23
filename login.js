const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const rememberMe = document.getElementById("rememberMe").checked;

  if (!email || !password) {
    message.textContent = "Please fill in all fields.";
    message.className = "message error";
    return;
  }

  // Show loading state
  const submitButton = form.querySelector("button[type='submit']");
  const originalButtonText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = "Logging in...";

  // In a real application, you would send a request to your backend API
  // Here's how you would do it with fetch:
  fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      rememberMe: rememberMe,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return response.json();
    })
    .then((data) => {
      // Store the token in localStorage or sessionStorage
      if (rememberMe) {
        localStorage.setItem("authToken", data.token);
      } else {
        sessionStorage.setItem("authToken", data.token);
      }

      // Store user info if available
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Show success message
      message.textContent = "Login successful!";
      message.className = "message";

      // Redirect to home page or dashboard
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    })
    .catch((error) => {
      console.error("Login error:", error);
      message.textContent = "Invalid email or password. Please try again.";
      message.className = "message error";
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    });

  // For demo purposes, simulate a successful login if no API is available
  // Remove this code when you implement the real API
  setTimeout(() => {
    // Simulate storing user session
    if (rememberMe) {
      localStorage.setItem("demoUser", JSON.stringify({ email }));
    } else {
      sessionStorage.setItem("demoUser", JSON.stringify({ email }));
    }

    // Show success message
    message.textContent = "Login successful!";
    message.className = "message";

    // Redirect to home page
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  }, 1500);
});