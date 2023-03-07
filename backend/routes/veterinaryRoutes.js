import express from 'express';
import { confirm, profile, register } from '../controllers/veterinaryController.js';

const veterinaryRouter = express.Router();

veterinaryRouter.post('/', register);
veterinaryRouter.get('/perfil', profile);
veterinaryRouter.get('/confirmar/:token', confirm);

export default veterinaryRouter;
