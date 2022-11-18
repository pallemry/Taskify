import { addDoc, DocumentData, getDocs, query, where } from 'firebase/firestore';
import express from 'express'
import { User } from '../config';

export const router = express.Router();

router.get('/', async (req, res) => {
    const querySnapshot = await getDocs(User);
    const users: DocumentData[] = []
    querySnapshot.forEach(doc => users.push(doc.data()));
    return res.json(users)
})

router.post('/new', async (req, res) => {
    const data = req.body;
    
    try {
        if (!(data.email && data.password)) 
            throw new Error(`Request doesnt have password and email`);
        
        const emailExists =  query(User, where("email", "==", data.email))
        const u = await getDocs(emailExists)
        if (u.size !== 0) {
            throw new Error(`User with email ${data.email} already exists`)
        }

        const user = await addDoc(User, {
            email: data.email,
            password: data.password
        });
        res.send({ msg: 'Success!', user: {...data} })
    } catch (e) {
        const reason: any = e instanceof Error ? e.message : e;
        
        res.status(400).send({msg: 'Failed to add user', reason: reason });
    }
});