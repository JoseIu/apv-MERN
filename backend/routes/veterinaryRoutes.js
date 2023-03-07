import express from 'express';
import { confirm, loging, profile, register } from '../controllers/veterinaryController.js';

const veterinaryRouter = express.Router();

veterinaryRouter.post('/', register);
veterinaryRouter.get('/perfil', profile);
veterinaryRouter.get('/confirmar/:token', confirm);
veterinaryRouter.post('/login', loging);

export default veterinaryRouter;
