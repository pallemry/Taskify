import express from 'express'
export const router = express.Router();

router.get('/', (req, res) => {
    res.send('list -u')
})

router.get('/new', (req, res) => {
    res.send('new -u')
});

const fibonacci = (n: number) =>
    [...Array(n)].reduce(
        (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
        []
    )

console.log(fibonacci(10))