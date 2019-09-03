const dotenv = require("dotenv");

dotenv.config();

const configurations = {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT,
    SECRET: process.env.SECRET,
};

export default configurations;
