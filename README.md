# Juice Shop Login Form

A simple login page modeled on OWASP Juice Shop's login screen. It demonstrates validating user input on **both** the client and the server.

## What it does

- Email and password fields with inline error messages
- **Client-side validation** (`script.js`): blocks empty fields, requires the email to contain `@`, and requires the password to be at least 8 characters
- **Server-side validation** (`server.js`): the same rules are re-checked on `POST /api/login`, because client-side checks can be bypassed
- Demo only: there is no user database or real authentication

## Requirements

- [Node.js](https://nodejs.org/) 16 or newer (no other dependencies)

## How to run

```bash
git clone <your-repo-url>
cd <repo-folder>
npm start
```

Then open http://localhost:3000 in your browser.

## Try it

| Input                              | Result                               |
| ---------------------------------- | ------------------------------------ |
| Empty fields                       | Blocked in the browser ("required")  |
| `user.example.com` / any password  | Blocked: email needs `@`             |
| `user@example.com` / `short`       | Blocked: password under 8 characters |
| `user@example.com` / `password123` | Passes both validations              |

To see the server-side check on its own, bypass the browser:

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"bad","password":"123"}'
```

The server responds with HTTP 400 and the validation errors.

## Files

- `index.html`: the login form and styling
- `script.js`: client-side validation and form submission
- `server.js`: static file server and `/api/login` validation endpoint
