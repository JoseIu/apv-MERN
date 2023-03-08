import express from 'express';
import { confirm, loging, profile, register } from '../controllers/veterinaryController.js';
import checkAuth from '../middleware/authMiddleware.js';

const veterinaryRouter = express.Router();

veterinaryRouter.post('/', register);
veterinaryRouter.get('/confirmar/:token', confirm);
veterinaryRouter.post('/login', loging);

// middleware checkAuth para verificar/proteger la ruta profile
veterinaryRouter.get('/perfil', checkAuth, profile);
export default veterinaryRouter;
