import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import conectBD from './config/db.js';
import patientRounters from './routes/patientRouters.js';
import veterinaryRouter from './routes/veterinaryRoutes.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
conectBD();

const app = express();
const dominPermit = ['http://localhost:5173'];
const corsOptions = {
  origin: function (origin, callback) {
    if (dominPermit.indexOf(origin) !== -1) return callback(null, true);
    else callback(new Error('No permitido por CORS'));
  }
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/veterinarios', veterinaryRouter);
app.use('/api/pacientes', patientRounters);

app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto http://localhost:${PORT}`);
});
