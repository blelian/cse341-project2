require('dotenv').config();
const express = require('express');
const path = require('path');
const countriesRoutes = require('./routes/countries');
const destinationsRoutes = require('./routes/destinations');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const connectDB = require('./utils/db');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Tourist Destinations API');
});

// Swagger docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use('/countries', countriesRoutes);
app.use('/destinations', destinationsRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).render('404'); // renders views/404.ejs
});

// 500 error handler
app.use((err, req, res, next) => {
  console.error('❌ 500 Error:', err.stack);
  res.status(500).render('500'); // renders views/500.ejs
});

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`🚀 Server running on port ${process.env.PORT}`)
  );
});
