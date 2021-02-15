# Kitch


## Features
### Required features
* geo location to allow users to search for caterers in neighbourhoods
* inventory list for menus that can be updated daily by caterers
* menu items searchable by users based on food type
* review system to allow users to review caterers
* allow caterers to mark time for pickup to alert users of pickup time for their food items

### Extra Features
* payment processing system to allow menu items to be ordered - STRETCH
* messaging system between caterers and users - STRETCH
* delivery system

## Installation
To get the application running follow this steps:
* Install NodeJs (version used 6.9.0) and Postgres on your local machine 
* git clone https://github.com/omaryrajaa/Kitchen.git

1. database: 
Database is created on Postgresql and run with docker file. Please install docker and postgresql client on your machine to use database.
* to install docker please follow instrustions here https://docs.docker.com/engine/install/ubuntu/
* to install postgresql client for Linux use command ` sudo apt install postgresql-client ` (For Mac OS and Windows instructions can be different)
* go the directory with Docker file /home/username/Kitchen/express_backend/db/migrations and run command ` sudo docker build -t eg_postgresql . `
* in new terminal window run ` sudo docker run -d --name pg_test -p 5432:5432 eg_postgresql `
* then run ` psql -p 5432 -d kitch_db -U kitch_user -h localhost ` (password: kitch_pw)
* to find out docker container ID, run in the terminal ` sudo docker ps -a `
* in database terminal run migrations an seeds files ` \i path_to_migrations.sql`, ` \i path_to_seeds.sql`
* next time when you want to run application, run docker with ` sudo docker start <containerID>` and run database server with ` psql -p 5432 -d kitch_db -U kitch_user -h localhost `


2. backend-express:
  * cd backend-express
  * Make a copy of the .env.example file and rename it to .env
  * Update .env with necessary environment details e.g database credentials
  * Install npm dependencies by running npm install
  * To start the server in development mode(using port 3005): npm run dev

3. clent:
  * cd client
  * Make a copy of the .env.example file and rename it to .env
  * Update .env with necessary environment details e.g Google API key(places, geocoding, map)
  * Install npm dependencies by running npm install
  * To start the server in development mode(using port 3000): npm start

## Technologies
### Backend
* NodeJS is a JavaScript runtime built on Chrome's V8 JavaScript engine
* Express JS A minimalist web framework
* PostgreSQL A powerful, open source object-relational database system
* ESLint provides a pluggable linting utility for JavaScript

### Frontend
* React A JavaScript library for building user interfaces
* Material UI an open-source project that features React components
* Axios a Promise based HTTP client for the browser and node.js





