require('dotenv').config();

const configurations = {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT
}

export default configurations;