# PokeBot User Registration API
PokeBot User Registration API is a API which stores PokeBot user's username and name.

## How to setup in local system
1. Clone this repository with `git clone <this repo url>`.
2. Install PostgreSQL 12.O or newer.
3. Create a database named `pokebotlogin`
4. Run SQL command in `telegram_user.sql` inside `pokebotlogin` database.
5. Run `npm install` to install all dependencies.
6. Run `npm start` to run server.
7. Open `localhost:5000`. If you get JSON of `{"hello": "world!"}` then everything is set.
