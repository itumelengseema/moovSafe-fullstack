
import express,{json,urlencoded} from 'express';
import vehicleRouter from './routes/vehicle/index';
const app = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes 
app.use("/api/vehicles", vehicleRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});