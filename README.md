# News Aggregator API

This project is a simple **News Aggregator Backend API** built using **Node.js and Express**.
It allows users to register, login, manage their preferences, and fetch news articles from an external news API.

The project demonstrates common backend concepts such as **authentication with JWT, password hashing with bcrypt, middleware usage, environment variables, and external API integration**.

---

# Features

### User Authentication

* User Signup
* User Login
* Password hashing using bcrypt
* JWT based authentication

### User Preferences

* Get user preferences
* Update user preferences

### News API

* Fetch latest news
* Search news by keyword
* Mark articles as read
* Retrieve read articles

### Security

* Password hashing using bcrypt
* JWT authentication for protected routes
* Environment variables using dotenv

---

# Tech Stack

* Node.js
* Express.js
* bcrypt
* jsonwebtoken
* axios
* dotenv
* tap (for testing)

---

# Project Structure

```
news-aggregator-api
│
├── src
│   ├── controllers
│   │      users.controller.js
│   │      news.controller.js
│   │
│   ├── routes
│   │      users.routes.js
│   │      news.routes.js
│   │
│   ├── middleware
│   │      auth.middleware.js
│   │
│   └── models
│          users.js
│
├── test
│     server.test.js
│
├── app.js
├── package.json
├── .env
└── README.md
```

---

# Environment Variables

Create a `.env` file in the root directory.

```
PORT=3000
JWT_SECRET=your_secret_key
NEWS_API_KEY=your_news_api_key
```

---

# Installation and Setup

### Clone the repository

```
git clone <your-repo-url>
cd news-aggregator-api
```

### Install dependencies

```
npm install
```

### Create .env file

Add the environment variables mentioned above.

### Run the server

```
npm start
```

Server will run on:

```
http://localhost:3000
```

---

# Running Tests

The project includes automated tests using **tap and supertest**.

Run tests using:

```
npm test
```

All tests should pass successfully.

---

# API Endpoints

## Authentication

### Register User

```
POST /users/signup
```

Example body:

```
{
 "name": "Clark Kent",
 "email": "clark@superman.com",
 "password": "Krypt()n8",
 "preferences": ["movies", "comics"]
}
```

---

### Login User

```
POST /users/login
```

Example body:

```
{
 "email": "clark@superman.com",
 "password": "Krypt()n8"
}
```

Response:

```
{
 "token": "JWT_TOKEN"
}
```

---

# Preferences APIs

### Get Preferences

```
GET /users/preferences
```

Headers:

```
Authorization: Bearer <token>
```

Response:

```
{
 "preferences": ["movies", "comics"]
}
```

---

### Update Preferences

```
PUT /users/preferences
```

Headers:

```
Authorization: Bearer <token>
```

Body:

```
{
 "preferences": ["movies", "comics", "games"]
}
```

---

# News APIs

### Get News

```
GET /news
```

Headers:

```
Authorization: Bearer <token>
```

Fetches latest news from the external News API.

---

### Search News

```
GET /news/search?q=keyword
```

Example:

```
GET /news/search?q=technology
```

Returns news articles matching the search keyword.

---

### Mark Article as Read

```
POST /news/read
```

Headers:

```
Authorization: Bearer <token>
```

Body:

```
{
 "url": "article_url"
}
```

---

### Get Read Articles

```
GET /news/read
```

Headers:

```
Authorization: Bearer <token>
```

Returns all articles marked as read by the user.

---

# Validation

Input validation is implemented for:

User Registration:

* Email format validation
* Password minimum length validation
* Required fields validation

Preferences Update:

* Preferences must be an array

---

# Authentication Flow

1. User registers using `/users/signup`
2. User logs in using `/users/login`
3. Server returns a JWT token
4. Token must be sent in request headers

```
Authorization: Bearer <token>
```

5. Middleware verifies the token before allowing access to protected routes.

---

# External API Integration

News data is fetched using the **NewsAPI service**.

Axios is used to make HTTP requests to the external API and retrieve news articles.

---

# Author

Prathamesh Nandivkar

---

# Notes

This project was created as part of a backend assignment to demonstrate understanding of:

* REST APIs
* Authentication
* Middleware
* External API integration
* Node.js backend development
