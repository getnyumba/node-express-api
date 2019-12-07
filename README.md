# Nyumba backend API

### Description
This is the web api for getNyumba a online platform that helps users to easily find houses for renting
getNyumba wants to solve the problem being faced by most people when trying to get houses
for example not getting places that dont suite thier needs and wallets and
also the blockers who always cheat people. GetNyumba will help to solve this 
problem but connecting Landlords directly to the users

### Technologies used

- Node js
- Express 
- Mongo DB
- Jest

### Design Pattern
- MVC

### Conventions

please refer to this to keep good and clean code conventions

    - All controllers, services and routes should be in folders with an index.js file that is exports any module 
        used eg services/user-service/index.js. This is done so as to aviod nested imports
    - All files with in a module e.g services should be named and prefixed with module name
        eg `user-service.js`
    - The routes module contains our core api. This will have various resources such users
        which will container a controller and an index.js for the routes. The controller will be named 
        in the form something-controller.js.
    - The services module contains classes that interact with our database. Never interact 
        directly with a database model and ensure all database related activity in carried out here
    - The helpers module contain functions or classes that help in performing a task such as creating tokens, sending emails
        files in helpers should be named like something-helper.js.
    - The middleware module contains functions/classes that help in handling incoming requests
        They are also to be named like something-middleware.js
    - Any configurations like secret keys should be stored in the config/ folder
    - The database module holds all the mongoose schema for get nyumba
    
##### Notes

- Validations are handled using @hapi/joi and the base class has already been setup           


### Setup 
- create a .env file in the root folder
- ensure you have a node-js installed and a monogo-db client
- Install dependencies using npm install


#
