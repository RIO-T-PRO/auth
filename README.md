# Full-Stack Authentication Boilerplate

A production-ready authentication boilerplate built with **React, Node.js, Express, PostgreSQL, and Prisma ORM**.

It includes **five authentication strategies** implemented from scratch, making it a practical reference for learning modern authentication patterns and a solid starting point for real-world applications.

## Features

- Session-based authentication
- JWT authentication (Access Token only)
- JWT + Refresh Token authentication with rotation
- Google & GitHub OAuth 2.0
- Google OpenID Connect (OIDC)
- Prisma ORM with PostgreSQL
- Password hashing with bcrypt
- Request validation with Zod
- CSRF protection
- Helmet security headers
- CORS origin whitelisting
- Type-safe database access
- Built with pnpm

---

## Authentication Strategies

### 1. Session Authentication

- Session ID stored in an `httpOnly` cookie
- Session data stored in PostgreSQL
- Custom Prisma-backed session store

**Best for:** Traditional web applications and SSR.

### 2. JWT (Access Token Only)

- Single long-lived access token
- Stored in client memory
- Sent via `Authorization: Bearer <token>`

**Best for:** Simple SPAs and APIs.

### 3. JWT + Refresh Token

- Short-lived access token (15 min)
- Long-lived refresh token (7 days)
- Refresh token rotation
- Refresh token stored in `httpOnly` cookie

**Best for:** Production-ready SPAs.

### 4. OAuth 2.0

- Google OAuth
- GitHub OAuth

### 5. OAuth 2.0 + OIDC

- Google OpenID Connect
- Extensible provider architecture

---

## Tech Stack

### Frontend

- React
- React Router
- Axios

### Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL

### Security

- bcryptjs
- Helmet
- CORS
- Zod

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- pnpm

### Installation

```bash
git clone https://github.com/RIO-T-PRO/auth.git
cd auth
```

Install dependencies:

```bash
# Backend
cd backend
pnpm install

# Frontend
cd ../frontend
pnpm install
```

Configure environment variables:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Run database migrations:

```bash
cd backend

pnpm prisma generate
pnpm prisma migrate dev --name init
```

Start development servers:

```bash
# Backend
pnpm dev

# Frontend
pnpm start
```

---

## Environment Variables

### Backend

```env
DATABASE_URL=
SESSION_SECRET=

JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

### Frontend

```env
REACT_APP_API_URL=http://localhost:5000/api
```

See `.env.example` files for the complete configuration.

---

## API Overview

### Session Authentication

```text
POST /api/auth/session/register
POST /api/auth/session/login
POST /api/auth/session/logout
GET  /api/auth/session/status
```

### JWT (Access Token)

```text
POST /api/auth/jwt/access/register
POST /api/auth/jwt/access/login
GET  /api/auth/jwt/access/profile
POST /api/auth/jwt/access/logout
```

### JWT + Refresh Token

```text
POST /api/auth/jwt/refresh/register
POST /api/auth/jwt/refresh/login
POST /api/auth/jwt/refresh/refresh
POST /api/auth/jwt/refresh/logout
GET  /api/auth/jwt/refresh/profile
```

---

## Project Structure

```text
auth/
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
│
└── README.md
```

---

## Security

- bcrypt password hashing (12 rounds)
- CSRF protection
- Secure cookies
- Refresh token rotation
- Helmet security headers
- Input validation with Zod
- CORS protection

---

## Prisma Commands

```bash
pnpm prisma generate
pnpm prisma migrate dev
pnpm prisma migrate deploy
pnpm prisma studio
```

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## License

MIT License

---

## Disclaimer

This project is intended for learning and development purposes. Before deploying to production, ensure proper HTTPS configuration, monitoring, logging, OAuth hardening (PKCE), and security auditing.
