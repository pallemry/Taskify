import { addDoc, getDocs, query, where } from 'firebase/firestore';
import express, { RequestHandler } from 'express'
import { User } from '../config';
import { uuidv4 } from '@firebase/util';
import CONSTS from '../consts.json'
import { ChildProcess } from 'child_process';
import verifySessionId from './verifySessionId';

export const router = express.Router();

const sessions: string[] = [];

router.use(verifySessionId(sessions))

// Get session id (sign in) route
router.post(CONSTS.paths.login, async (req, res) => {
    const data = req.body;

    const querySnapshot = await getDocs(query(User,
        where("email", "==", data.email),
        where("password", "==", data.password)
    ));

    const exists = querySnapshot.size === 1;
    if (exists) {
        const sessionId = uuidv4();
        sessions.push(sessionId);
        res.cookie('sid', sessionId, { secure: true, httpOnly: true });
        res.status(200).send('logged in!')
    } else {
        res.status(401).send('Username or password is incorrect')
    }
})

// New user (Sign up) route
router.post(CONSTS.paths.new, async (req, res) => {
    const data = req.body;

    try {
        if (!(data.email && data.password))
            throw new Error(`Request doesnt have password and email`);

        const emailExists = query(User, where("email", "==", data.email))
        const u = await getDocs(emailExists)
        if (u.size !== 0) {
            throw new Error(`User with email ${data.email} already exists`)
        }

        const user = await addDoc(User, {
            email: data.email,
            password: data.password
        });
        res.send({ msg: 'Success!', user: { ...data } })
    } catch (e) {
        const reason: any = e instanceof Error ? e.message : e;

        res.status(400).send({ msg: 'Failed to add user', reason: reason });
    }
});

router.get('/secret', async (req, res) => {
    res.send('hi!')
    res.status(200).send(`secret to: ${req.body.session}`)
});
