import express, { json, urlencoded } from 'express';
import vehicleRouter from './routes/vehicle/index.js';
import inspectionRouter from './routes/Inspection/index.js';
import maintenanceRouter from './routes/MaintenanceHistory/index.js';
import { setupSwagger } from './config/swagger.js';

const port = process.env.PORT || 3000;

const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(json());
app.use(urlencoded({ extended: true }));

// Setup Swagger documentation
setupSwagger(app);

/**
 * @swagger
 * /:
 *   get:
 *     summary: API Health Check
 *     tags: [Health]
 *     description: Check if the API is running
 *     responses:
 *       200:
 *         description: API is running successfully
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "🚗 MoovSafe API is running! Visit /api-docs for documentation."
 */
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MoovSafe API</title>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@5.3.8/dist/lux/bootstrap.min.css">
  <style>
    /* Optional: animated background grid */
    body {
      background: radial-gradient(circle at center, rgba(50,50,50,0.4), transparent 60%);
      min-height: 100vh;
    }
    .hero-logo {
      width: 200px;
      margin-bottom: 1rem;
    }

  </style>
</head>
<body>

  <div class="container text-center d-flex flex-column justify-content-center align-items-center min-vh-100">
    
    <!-- Logo -->
    <img src="https://res.cloudinary.com/dm5v9praz/image/upload/v1760298688/_Logo_2_xmxymy.png" alt="MoovSafe Logo" class="hero-logo">

    <!-- Hero Title -->
    <h1 class="display-4 fw-bold">MoovSafe API</h1>
    <p class="lead mb-4">Vehicle Fleet Management & Inspection System</p>

    <!-- Buttons -->
    <div class="mb-5">
      <a href="/api-docs" class="btn btn-primary btn-sm me-2">View API Docs</a>
      <a href="/api/vehicles" class="btn btn-outline-secondary btn-sm"> Explore Vehicles</a>
    </div>

    </div>

</body>
</html>

  `);
});

// Routes
app.use('/api/vehicles', vehicleRouter);
app.use('/api/inspections', inspectionRouter);
app.use('/api/maintenance', maintenanceRouter);

// 404 handler
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - 404 Not Found`);
  res.status(404).json({
    error: 'Endpoint not found',
    message: `The endpoint ${req.method} ${req.path} does not exist. Visit /api-docs for available endpoints.`,
    statusCode: 404
  });
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api-docs`);
  console.log(`🔗 Available endpoints: /api/vehicles, /api/inspections, /api/maintenance`);
});
