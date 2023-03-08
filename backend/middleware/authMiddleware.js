import jwt from 'jsonwebtoken';
import Veterinary from '../models/Veterinary.js';

const checkAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;

  //Comprobamo si ha enviado el token
  if (!authorization || !authorization.startsWith('Bearer')) return res.status(400).json({ msg: 'Token no valido' });

  token = authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decoded;

    req.veterinaryAuth = await Veterinary.findById(id).select('-password -token -confirmed');

    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token inválido' });
  }
};
export default checkAuth;
