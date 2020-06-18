# advansio-backend

Heroku url: https://commenter-api.herokuapp.com/

### Setup instructions
- Clone the repo and run `yarn install` to install dependencies
- Create a .env file and add the appropriate environment variables. See the .env.example file for an example
- Run `yarn run dev` to start the server in development mode
- Run the command `yarn run sequelize db:migrate` to run the database migration files

### Additional information
- every endpoint request should be prefixed with /v1 .i.e https://commenter-api.herokuapp.com/v1/login
