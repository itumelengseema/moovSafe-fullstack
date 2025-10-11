import express, { json, urlencoded } from 'express';
import vehicleRouter from './routes/vehicle/index.js';
import inspectionRouter from './routes/Inspection/index.js';
import maintenanceRouter from './routes/MaintenanceHistory/index.js';
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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes
app.use('/api/vehicles', vehicleRouter);
app.use('/api/inspections', inspectionRouter);
app.use('/api/maintenance', maintenanceRouter);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - 404 Not Found`);
  next();
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
