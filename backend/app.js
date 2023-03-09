import dotenv from 'dotenv';
import express from 'express';
import conectBD from './config/db.js';
import patientRounters from './routes/patientRouters.js';
import veterinaryRouter from './routes/veterinaryRoutes.js';

dotenv.config();
conectBD();
const PORT = process.env.PORT || 300;

const app = express();

app.use(express.json());
app.use('/api/veterinarios', veterinaryRouter);
app.use('/api/pacientes', patientRounters);

app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto http://localhost:${PORT}`);
});
