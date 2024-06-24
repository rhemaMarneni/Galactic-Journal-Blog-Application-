# Galactic-Journal-Blog-Application

Galactic Journal is a **multi-user Blog Application** that lets users view the most recent posts from all users in the userbase. Authenticated users can create, view, edit, and delete blog posts. This application is built using Node.js, Express.js, and PostgreSQL and supports all **CRUD operations**. The application uses **local and Google OAuth v2.0 authentication strategies** through Passport authentication middleware. It also supports **session management with cookies** live for 24 hours.

If you want to run the project locally, follow these steps. <br>

## Initial steps
1. **Setup Google authentication credentials** by obtaining a Client Secret and Client ID. If you are new to this, watch this YouTube video: https://www.youtube.com/watch?v=OKMgyF5ezFs (it's super easy)
2. Install and `cd` into the project directory
3. **Setup Database** Create your database and create schema (or run `queries.sql` in the project folder) in pgAdmin 4
4. In the root of the project directory, create a `.env` file and copy-paste this text below:<br><br>
      `GOOGLE_CLIENT_ID="your_google_client_id"`<br>
      `GOOGLE_CLIENT_SECRET="your_google_client_secret"`<br>
      `SESSION_SECRET="your_secret_word"`<br>
      `PG_USER="postgres"`<br>
      `PG_HOST="localhost"`<br>
      `PG_DATABASE="your_database_name"`<br>
      `PG_PASSWORD="your_database_password"`<br>
      `PG_PORT="5432"`<br><br>
   Replace all fields with your values. Since you are running this locally, you can keep `PG_USER`, `PG_HOST` and `PG_PORT` the same

## Steps to run

5. Install necessary modules with `npm i`
6. In `index.js`, fill your database name and password that you used to set up PostgreSQL on your computer 
7. (Optional) Install `nodemon`
8. Run the project using `nodemon index.js`

## Authentication

I used local and Google OAuth 2.0 authentication strategies using Passport. The local authentication uses the Blowfish algorithm for hashing by default. For more documentation visit https://www.passportjs.org/

## Technologies
Node.js, Express.js, EJS/HTML, CSS (SASS), PostgreSQL

## Tools
To run this project locally in your computer, you will have to use/install:
1. A Code editor (Ex: VSCode)
2. Postgres Database (pgAdmin 4)

## Useful VSCode extensions
- Live Sass Compiler v6.1.2
- EJS language support v1.3.3
- JavaScript (ES6) code snippets v1.8.0
- HTML Boilerplate v1.1.1
- Prettier - Code formatter
- Bracket Pair Colorization Toggler v0.0.3
- Babel JavaScript v0.0.40
