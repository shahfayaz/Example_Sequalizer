# Example_Sequalizer

An Express + Sequelize starter API using PostgreSQL, with `User`, `Post`, and `Comment` models and simple routes under `/api`. Designed to demonstrate model associations and basic CRUD flows.

## Tech Stack

- Node.js (CommonJS)
- Express
- Sequelize (v6)
- PostgreSQL
- dotenv
- body-parser

## Quick Start

1. Ensure PostgreSQL is running locally and you have a database created (default `demo2`).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment:
   - Copy `.example.env` to `.env` and adjust values as needed.
   - Update `src/config/dbConnection.js` to match your local DB credentials (username/password/database/host).
4. Start in development:
   ```bash
   npm run dev
   ```
5. The server listens on `PORT` from `.env` or defaults to `4010`.

## Configuration

- App config is loaded from `.env` (via `dotenv`) primarily for `PORT`. Example:
  ```
  DB_HOST=localhost
  DB_USER=postgres
  DB_PASSWORD=root
  DB_NAME=demo2
  DB_PORT=5432
  PORT=3000
  ```
- Sequelize is configured via `src/config/dbConnection.js`. In `development`, the defaults are:
  ```js
  {
    username: "postgres",
    password: "root",
    database: "demo2",
    host: "127.0.0.1",
    dialect: "postgres",
    logging: false
  }
  ```
  Update these to match your local PostgreSQL setup.

- A `.sequelizerc` file points Sequelize CLI paths to:
  - `config`: `src/config/dbConnection.js`
  - `models-path`: `src/models`
  - `seeders-path`: `src/seeders`
  - `migrations-path`: `src/migrations`

Note: The project currently does not include `sequelize-cli` in `package.json`. If you plan to use migrations/seeders, install it:
```bash
npm i -D sequelize-cli
```

## Database Sync

On server start, models are synced automatically:
```js
db.sequelize.sync({ force: false, alter: true })
```
- `alter: true` updates tables to match model definitions.
- For production, prefer migrations over `alter`.

## API Endpoints

Base path: `/api`

- Create a user (GET, uses query params):
  ```
  GET /api/user/add?firstName=Alice&lastName=Smith&email=alice@example.com&age=30
  ```
- Get all users (filtered by last name):
  ```
  GET /api/users?lastName=Smith
  ```
- Get a user by ID:
  ```
  GET /api/users/1
  ```
- Add a post to a user (GET):
  ```
  GET /api/user/post/add?userId=1&title=Hello&content=World
  ```
- Add a comment to a post (GET):
  ```
  GET /api/user/comment/add?postId=1&text=Nice+post
  ```
- Delete a comment (GET):
  ```
  GET /api/user/comment/delete?id=3
  ```

Important: The routes use `GET` with `req.query` for create/delete actions for demo simplicity. For real applications, switch to `POST/DELETE` with JSON bodies.

## Data Models

- `User`:
  - `firstName` (required), `lastName`, `email` (unique, required), `age`
  - Associations: `hasMany(Post, as: 'posts')`

- `Post`:
  - `title` (required), `content`
  - Associations: `belongsTo(User, as: 'author')`, `hasMany(Comment, as: 'comments')`

- `Comment`:
  - `text` (required)
  - Associations: `belongsTo(Post, as: 'post')`
  - Paranoid (soft deletes enabled)

## Project Structure