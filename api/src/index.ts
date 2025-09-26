
import express,{json,urlencoded} from 'express';
import vehicleRouter from './routes/vehicle/index';
const port = process.env.PORT || 3000;

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes 
app.use("/api/vehicles", vehicleRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});