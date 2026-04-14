# Backend Project Complete Guide

Hi everyone,

In this guide, I will explain step by step how I built this backend project.

As you know, we were given starter code with strict instructions not to change it. We had to implement everything on top of that.

---

## Understanding the Problem

First, I carefully understood the problem statement.

The problem clearly mentioned that we need to build authentication on top of the given code. So, I decided to start with authentication first.

I followed standard practices to build this authentication.

---

## Initial Setup

- First, I understood how the database connection was written in the starter code.
- Then, I added my own database connection URL using Docker and then add into environment variables (`.env`).
- After that, I wrote down all the steps required to build authentication:
  - How to start
  - What features to include
  - How to complete the authentication system

Then, I planned the step-by-step implementation.

---

## Step-by-Step Implementation

### 1. Database & ORM Setup
- Added database connection
- Setup Drizzle ORM
- Created user schema
- Run database migrations

---

### 2. Basic Structure
- Added DTO layer
- Created `ApiError` and `ApiResponse` utilities

---

### 3. Routes Setup
- Configured all API routes and connect with started code and write all necceassy thinks

---

### 4. Controllers

#### Register Controller
- User sends data
- Check if user already exists → if yes, throw error
- If not:
  - Hash the password
  - Insert user data into database
- Return user data with success message

---

#### Login Controller
Before writing login logic:
- Created JWT utility functions
- Created password comparison function

Then implemented login:
- Check if email exists in database
  - If not → return error (user not registered)
- If exists:
  - Compare password with hashed password in database
- If password matches:
  - Generate access token
  - Generate refresh token
  - Send tokens in response
  - Also send cookie

---

### 5. Authentication Middleware

Created middleware to protect routes.

Steps:
- Take token from:
  - Authorization header OR
  - Cookies
- Check if token starts with `Bearer`
- Extract actual token
- Verify token using JWT
- Get payload data from token
- Validate payload data with database
- Check if user exists
- Add user data into request object
- Call `next()` function

---

### 6. Testing Authentication

- Created a route to get user details
- Only logged-in users can access it

---

### 7. Logout Feature

- Built logout route
- Allows user to logout properly

---

### 8. Protecting Routes

- Added authentication middleware to all booking routes
- Now only logged-in users can access those routes

---

## Conclusion

This is how I built the complete authentication system step by step.

Hope you understand the flow and implementation.
