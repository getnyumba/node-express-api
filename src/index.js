import app from './app';
import mongoDB, { models }  from './database';
import config from './config';

const { PORT } = config;

mongoDB().then(() => {
    console.log('Connected')
}).catch((error) => console.log(error));


app.listen(PORT || 8000, () => {
    console.log('GetNyumba Inc. on port: 8000')
})
