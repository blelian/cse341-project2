// server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const connectDB = require('./utils/db');

const countriesRoutes = require('./routes/countries');
const destinationsRoutes = require('./routes/destinations');
const authRoutes = require('./routes/auth');

const app = express();

// Set EJS and static files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.json());

// 🔐 Express-session config (fixed)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// 🔐 Initialize passport AFTER session
app.use(passport.initialize());
app.use(passport.session());

// Load Google strategy
require('./utils/passport');

// Auth routes BEFORE Swagger
app.use('/auth', authRoutes);

// Swagger + API routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/countries', countriesRoutes);
app.use('/destinations', destinationsRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Tourist Destinations API');
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).render('404');
});

// 500 error handler
app.use((err, req, res, next) => {
  console.error('❌ 500 Error:', err.stack);
  res.status(500).render('500');
});

// Connect DB and start server
connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
