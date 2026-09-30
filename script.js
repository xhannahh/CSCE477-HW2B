function isValidLogin(email, password) {
  return email.includes("@") && password.length >= 8;
}

document.getElementById("login-form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  if (!email || !password) {
    message.textContent = "Email and password are required.";
    return;
  }
  if (!email.includes("@")) {
    message.textContent = "Email must contain '@'.";
    return;
  }
  if (password.length < 8) {
    message.textContent = "Password must be at least 8 characters.";
    return;
  }

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    message.textContent = data.message;
  } catch (error) {
    message.textContent = "Could not reach the server.";
  }
});