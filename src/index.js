import app from "./app";
import mongoDB from "./database";
import config from "./config";


const { PORT } = config;

mongoDB().then(() => {
    console.log("Connected");
}).catch((error) => console.log(error));

const port = PORT || 8000;
app.listen(port, () => {
    console.log(`GetNyumba Inc. on port: ${port}`);
});
