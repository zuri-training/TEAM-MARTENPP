if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Importing Libraies that we installed using npm
const express = require('express');
const app = express();
const{ json } = require('express');
const routes = require("./routes/router");
const bcrypt = require('bcrypt'); // Importing bcrypt package
const passport = require('passport');
const initializePassport = require('./passport-config');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const connectDB = require('./config/database');


// connect to the database
connectDB();

initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

const users = [];

app.use(express.json());
app.use('/views', express.static('views'));
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // We wont resave the session variable if nothing is changed
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// Configuring the register post functionality
app.post(
  '/login',
  checkNotAuthenticated,
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

// Configuring the register post functionality
app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    console.log(users); // Display newly registered in the console
    res.redirect('/login');
  } catch (e) {
    console.log(e);
    res.redirect('/register');
  }
});

// Routes

app.get('/', checkNotAuthenticated, (req, res) => {
  res.render('homepage.ejs');
});

app.get('/about', checkNotAuthenticated, (req, res) => {
  res.render('about.ejs');
});

app.get('/contact', checkNotAuthenticated, (req, res) => {
  res.render('contact.ejs');
});

app.get('/pricing', checkNotAuthenticated, (req, res) => {
  res.render('homepage.ejs');
});

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs');
});

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs');
});

app.get('/dashboard', checkAuthenticated, (req, res) => {
  res.render('dashboard.ejs', { name: req.user.name });
});

app.get('/profile', checkAuthenticated, (req, res) => {
  res.render('profile.ejs', { name: req.user.name });
});

app.get('/editprofile', checkAuthenticated, (req, res) => {
  res.render('editprofile.ejs', { name: req.user.name });
});

app.get('/resetpassword', checkAuthenticated, (req, res) => {
  res.render('reset.ejs', { name: req.user.name });
});

// End Routes

// app.delete('/logout', (req, res) => {
//     req.logOut()
//     res.redirect('/login')
//   })

app.delete('/logout', (req, res) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

app.use("/", routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
