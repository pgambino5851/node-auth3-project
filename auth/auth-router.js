const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 

const Users = require("../users/users-model")

router.post('/register', (req, res) => {

    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.post('/login', (req, res) => {

    let {username, password} = req.body;
    Users.findBy({username})
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
            const token = generateToken(user);
            res.status(200).json({
                message: `Welcome ${user.username}!`,
                token
            })
        } else {
            res.status(401).json({ message: 'Invalid credentials' })
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

function generateToken(user) {
const payload = {
    username: user.username
}

const secret = "keep it secret, keep it safe"

const options = {
    expiresIn: "1h"

}

    return jwt.sign(payload, secret, options)
}


router.get('/', (req, res) => {
    res.send("Hello from auth router!")
})

module.exports = router;