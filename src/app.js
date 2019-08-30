import express from 'express';
import { userRouter } from './routes';

const app = express();
const previx = '/api/v1';

// all routes shall be added here
app.use(`${previx}/users`, userRouter);

app.get(previx, (req, res) => {
    return res.send({
        message: 'Welcome to getNyumba'
    })
})

export default app;