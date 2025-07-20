require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const countriesRoutes = require('./routes/countries');
const destinationsRoutes = require('./routes/destinations');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ensure views folder is located correctly

// Serve static files (optional, for CSS/JS/images)
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Tourist Destinations API');
});

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use('/countries', countriesRoutes);
app.use('/destinations', destinationsRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).render('404'); // Renders views/404.ejs
});

// 500 handler (must have 4 parameters to trigger Express error middleware)
app.use((err, req, res, next) => {
  console.error('❌ 500 Error:', err.stack);
  res.status(500).render('500'); // Renders views/500.ejs
});

// DB connection and server start
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(process.env.PORT, () =>
    console.log(`🚀 Server running on port ${process.env.PORT}`)
  );
}).catch(err => console.error('MongoDB connection error:', err));
