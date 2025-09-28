import express, { json, urlencoded } from 'express';
import vehicleRouter from './routes/vehicle/index.js';
import inspectionRouter from './routes/Inspection/index.js';
import maintenanceRouter from './routes/MaintenanceHistory/index.js';
const port = process.env.PORT || 3000;

const app = express();
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
