// Check if user is logged in
function isLoggedIn() {
  return (
    localStorage.getItem("authToken") ||
    sessionStorage.getItem("authToken") ||
    localStorage.getItem("demoUser") ||
    sessionStorage.getItem("demoUser")
  );
}

// Get current user
function getCurrentUser() {
  const userJson =
    localStorage.getItem("user") ||
    sessionStorage.getItem("user") ||
    localStorage.getItem("demoUser") ||
    sessionStorage.getItem("demoUser");
  return userJson ? JSON.parse(userJson) : null;
}

// Logout function
function logout() {
  // Clear all auth data
  localStorage.removeItem("authToken");
  sessionStorage.removeItem("authToken");
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
  localStorage.removeItem("demoUser");
  sessionStorage.removeItem("demoUser");

  // Redirect to home page
  window.location.href = "index.html";
}

// Update navigation based on auth status
function updateNavigation() {
  const navbars = document.querySelectorAll(".navbar");

  navbars.forEach((navbar) => {
    const nav = navbar.querySelector("nav");
    if (!nav) return;

    // Remove any existing login/signup buttons
    const existingLoginBtn = nav.querySelector("a[href='login.html']");
    if (existingLoginBtn) existingLoginBtn.remove();

    const existingSignupBtn = nav.querySelector("a[href='signup.html']");
    if (existingSignupBtn) existingSignupBtn.remove();

    const existingUserMenu = nav.querySelector(".user-menu");
    if (existingUserMenu) existingUserMenu.parentElement.remove();

    // Add appropriate auth elements based on login status
    if (isLoggedIn()) {
      // User is logged in, add user menu
      const user = getCurrentUser();
      const displayName =
        user && user.email ? user.email.split("@")[0] : "User";

      const userMenuContainer = document.createElement("div");
      userMenuContainer.className = "auth-container";
      userMenuContainer.innerHTML = `
        <div class="user-menu">
          <button class="user-button">
            <span>${displayName}</span>
            <span class="dropdown-icon">▼</span>
          </button>
          <div class="dropdown-menu">
            <a href="profile.html">Profile</a>
            <a href="Book.html">My Books</a>
            <a href="#" id="logoutBtn">Logout</a>
          </div>
        </div>
      `;

      nav.appendChild(userMenuContainer);

      // Add event listener to logout button
      const logoutBtn = userMenuContainer.querySelector("#logoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", function (e) {
          e.preventDefault();
          logout();
        });
      }

      // Toggle dropdown menu
      const userButton = userMenuContainer.querySelector(".user-button");
      const dropdownMenu = userMenuContainer.querySelector(".dropdown-menu");

      if (userButton && dropdownMenu) {
        userButton.addEventListener("click", function () {
          dropdownMenu.classList.toggle("show");
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", function (e) {
          if (
            !userButton.contains(e.target) &&
            !dropdownMenu.contains(e.target)
          ) {
            dropdownMenu.classList.remove("show");
          }
        });
      }
    } else {
      // User is not logged in, add login and signup buttons
      const authContainer = document.createElement("div");
      authContainer.className = "auth-container";
      authContainer.innerHTML = `
        <a href="login.html"><button class="login-btn">Log In</button></a>
        <a href="signup.html"><button class="sign-up">Sign Up</button></a>
      `;

      nav.appendChild(authContainer);
    }
  });
}

// Add styles for auth elements
function addAuthStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .auth-container {
      display: flex;
      align-items: center;
      margin-left: auto;
    }
    
    .user-menu {
      position: relative;
    }
    
    .user-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background-color: #f0f0f0;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
    }
    
    .dropdown-icon {
      font-size: 0.8rem;
    }
    
    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background-color: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      padding: 0.5rem 0;
      min-width: 150px;
      display: none;
      z-index: 100;
    }
    
    .dropdown-menu.show {
      display: block;
    }
    
    .dropdown-menu a {
      display: block;
      padding: 0.5rem 1rem;
      color: #333;
      text-decoration: none;
    }
    
    .dropdown-menu a:hover {
      background-color: #f5f5f5;
    }
    
    .login-btn {
      background-color: transparent;
      color: #333;
      border: 1px solid #ccc;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      margin-right: 0.5rem;
    }
    
    .login-btn:hover {
      background-color: #f5f5f5;
    }
  `;
  document.head.appendChild(style);
}

// Initialize auth functionality
document.addEventListener("DOMContentLoaded", function () {
  addAuthStyles();
  updateNavigation();
});
