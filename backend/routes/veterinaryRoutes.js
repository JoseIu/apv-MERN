import express from 'express';
import {
  checkToken,
  confirm,
  loging,
  newPwd,
  profile,
  register,
  resetPassword
} from '../controllers/veterinaryController.js';
import checkAuth from '../middleware/authMiddleware.js';

const veterinaryRouter = express.Router();
//Area pública
veterinaryRouter.post('/', register);
veterinaryRouter.get('/confirmar/:token', confirm);
veterinaryRouter.post('/login', loging);

veterinaryRouter.post('/olvide-password', resetPassword);
veterinaryRouter.route('/olvide-password/:token').get(checkToken).post(newPwd);

//Area privada
// middleware checkAuth para verificar/proteger la ruta profile
veterinaryRouter.get('/perfil', checkAuth, profile);
export default veterinaryRouter;
