const express = require("express");
const app = express();
const session = require('express-session');
const signupRouter = require('./routes/signup');
const authRouter = require('./routes/auth');
const quizRouter = require('./routes/test');
const dashboardRouter = require('./routes/dashboard');
const port = 3000;

app.use(express.static(__dirname + '/public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));

app.use(express.json());
app.use('/', signupRouter);
app.use('/', authRouter);
app.use(quizRouter);
app.use(dashboardRouter);

const server = app.listen(port, () => {
    const servername = server.address().address;
    const serverport = server.address().port;
    console.log("The server is running");
    console.log("http://%s:%s", servername, serverport);
});