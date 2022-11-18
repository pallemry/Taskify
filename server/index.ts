import express from 'express';
import { db } from './config';
import cors from 'cors';
import { router as usersRouter } from './routes/users';

const port = 8000;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log('listening on port (after ts config)' + port);
})