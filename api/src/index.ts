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
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
      <img src="./assets/logoBurna.png" alt="MoovSafe Logo" width="1584" ><h1>MoovSafe API</h1>
      <p>Vehicle Fleet Management & Inspection System</p>
      <p><strong>API is running successfully!</strong></p>
      <p><a href="/api-docs" style="color: #007bff; text-decoration: none; font-size: 18px;">📚 View API Documentation</a></p>
      <hr style="margin: 30px 0;">
      <div style="text-align: left; max-width: 600px; margin: 0 auto;">
        <h3>Available Endpoints:</h3>
        <ul style="line-height: 1.6;">
          <li><strong>GET</strong> <code>/api/vehicles</code> - Get all vehicles</li>
          <li><strong>POST</strong> <code>/api/vehicles</code> - Create new vehicle</li>
          <li><strong>GET</strong> <code>/api/inspections</code> - Get all inspections</li>
          <li><strong>POST</strong> <code>/api/inspections</code> - Create new inspection</li>
          <li><strong>GET</strong> <code>/api/maintenance</code> - Get maintenance history</li>
          <li><strong>POST</strong> <code>/api/maintenance</code> - Create maintenance record</li>
        </ul>
      </div>
    </div>
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
