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

1. backend-express:
  * cd backend-express
  * Make a copy of the .env.example file and rename it to .env
  * Update .env with necessary environment details e.g database credentials
  * Install npm dependencies by running npm install
  * To start the server in development mode(using port 3005): npm run dev

2. clent:
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





