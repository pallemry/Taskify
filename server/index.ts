import express from 'express';
import { router as usersRouter } from './routes/users';
const port = 8000;
const app = express();

app.get('/', (req, res) => {
    res.status(500)
    .send('hi')
})

app.use('/user', usersRouter);

app.listen(port, () => {
    console.log('listening on port (after ts config)' + port);
})