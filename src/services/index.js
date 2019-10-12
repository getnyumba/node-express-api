// This is the default export file for our database services
// Services are responsible for interacting with our database models
// Its good design pattern to separate concern
/*
Models => Database schemas
*/

import UserService from "./user-service";
/* eslint-disable import/prefer-default-export */
export {
    UserService,
};
