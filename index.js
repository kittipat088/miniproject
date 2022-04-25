
const express = require('express'),
    app = express(),
    passport = require('passport'),
    port = process.env.PORT || 80,
    cors = require('cors'),
    cookie = require('cookie')

const bcrypt = require('bcrypt')

const db = require('./database.js')
let users = db.users

let Cars = {
    list:
        [
            { id: "001", band: 'Tesla', model: '3', hp: 450, price: "3,090,000" },

        ]
}

require('./passport.js')

const router = require('express').Router(),
    jwt = require('jsonwebtoken')

app.use('/api', router)
router.use(cors({ origin: 'http://localhost:3000', credentials: true }))
// router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))


//Cars
router.route('/Cars')
    .get((req, res) => res.json(Cars))
    .post((req, res) => {
        console.log(req.body)
        //let id = (Cars.list.length)? Cars.list[Cars.list.length-1].id+1:1
        let newCar = {}
        newCar.id = (Cars.list.length) ? Cars.list[Cars.list.length-1].id+1 : 1
        newCar.band = req.body.band
        newCar.model = req.body.model
        newCar.hp = req.body.hp
        newCar.price  = req.body.price
        Cars = { list: [...Cars.list, newCar] }
        res.json(Cars)
    })

router.route('/Cars/:car_id') //params
    .get((req, res) => {
        let id = Cars.list.findIndex((item) => (+item.id === +req.params.car_id))
        
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            res.json(Cars.list[id])
        }
        

    })
    .put((req, res) => {
        let id = Cars.list.findIndex((item) => (+item.id === +req.params.car_id))
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            Cars.list[id].band = req.body.band
            Cars.list[id].model = req.body.model
            Cars.list[id].hp = req.body.hp
            Cars.list[id].price = req.body.price
            res.json(Cars)
        }


    })
    .delete((req, res) => {
       
        let id = Cars.list.findIndex((item) => (+item.id === +req.params.car_id))
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            Cars.list = Cars.list.filter((item) => +item.id !== +req.params.car_id)
            res.json(Cars)
        }
    })






    let BuyCars = {
        list:
            [
                { id: "001", band: 'Tesla', model: '3', price: "3,090,000" },
    
            ]
    }

    router.route('/BuyCars')
    .get((req, res) => res.json(BuyCars))
    .post((req, res) => {
        console.log(req.body)
        //let id = (BuyCars.list.length)? BuyCars.list[BuyCars.list.length-1].id+1:1
        let newCar = {}
        newCar.id = (BuyCars.list.length) ? BuyCars.list[BuyCars.list.length-1].id+1 : 1
        newCar.band = req.body.band
        newCar.model = req.body.model
        newCar.price  = req.body.price
        BuyCars = { list: [...BuyCars.list, newCar] }
        res.json(BuyCars)
    })

router.route('/BuyCars/:car_id') //params
    .get((req, res) => {
        let id = BuyCars.list.findIndex((item) => (+item.id === +req.params.car_id))
        
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            res.json(BuyCars.list[id])
        }
        

    })
    .put((req, res) => {
        let id = BuyCars.list.findIndex((item) => (+item.id === +req.params.car_id))
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            BuyCars.list[id].band = req.body.band
            BuyCars.list[id].model = req.body.model
            BuyCars.list[id].price = req.body.price
            res.json(BuyCars)
        }


    })
    .delete((req, res) => {
       
        let id = BuyCars.list.findIndex((item) => (+item.id === +req.params.car_id))
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            BuyCars.list = BuyCars.list.filter((item) => +item.id !== +req.params.car_id)
            res.json(BuyCars)
        }
    })




    
router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log('Login: ', req.body, user, err, info)
        if (err) return next(err)
        if (user) {
            const token = jwt.sign(user, db.SECRET, {
                expiresIn: (req.body.rememberme === "on") ?'7d' : '1d'
            })
            // req.cookie.token = token
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    maxAge: 60 * 60,
                    sameSite: "strict",
                    path: "/",
                })
            );
            res.statusCode = 200
            return res.json({ user, token })
        } else
            return res.status(422).json(info)
    })(req, res, next)
})





router.get('/logout', (req, res) => { 
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: -1,
            sameSite: "strict",
            path: "/",
        })
    );
    res.statusCode = 200
    return res.json({ message: 'Logout successful' })
})

/* GET user profile. */
router.get('/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.send(req.user)
    });

router.get('/foo',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        return res.json({ message: "Foo" })
    });

router.post('/register',
    async (req, res) => {
        try {
            const SALT_ROUND = 10
            const { username, email, password } = req.body 
            if (!username || !email || !password)
                return res.json( {message: "Cannot register with empty string"})
            if (db.checkExistingUser(username) !== db.NOT_FOUND)
                return res.json({ message: "Duplicated user" })

            let id = (users.users.length) ? users.users[users.users.length - 1].id + 1 : 1
            hash = await bcrypt.hash(password, SALT_ROUND)
            users.users.push({ id, username, password: hash, email })
            res.status(200).json({ message: "Register success" })
        } catch {
            res.status(422).json({ message: "Cannot register" })
        }
    })

router.get('/alluser', (req,res) => res.json(db.users.users))

router.get('/', (req, res, next) => {
    res.send('Respond without authentication');
});


// Error Handler
app.use((err, req, res, next) => {
    let statusCode = err.status || 500
    res.status(statusCode);
    res.json({
        error: {
            status: statusCode,
            message: err.message,
        }
    });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`))

