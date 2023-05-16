import bcrypt from 'bcrypt';
import idGenerator from '../helpers/idGenerator.js';
import jwtGenerator from '../helpers/jwtGenerator.js';
import sendEmailRegister from '../helpers/sendEmailRegister.js';
import sendResetPWD from '../helpers/sendResetPWD.js';
import Veterinary from '../models/Veterinary.js';

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.sendStatus(400);

  //Evitamos usuarios duplicados
  const existVeterinary = await Veterinary.findOne({ email });
  if (existVeterinary) return res.status(409).json({ error: 'usuario ya registrado' });

  try {
    //Crea y Guarda nuevo Veterinario
    const veterinary = new Veterinary(req.body);
    const veterinarySaved = await veterinary.save();

    //Enviamos el email para verificar
    sendEmailRegister({ email, name, token: veterinarySaved.token });

    return res.json(veterinarySaved);
  } catch (error) {
    console.log(error);
  }
};
//Confirmamos la cuenta para poder registrase correctamente
const confirm = async (req, res) => {
  const { token } = req.params;

  try {
    //Verificamos si el token existe
    const veterinaryConfirm = await Veterinary.findOne({ token });

    if (!veterinaryConfirm) {
      const error = new Error('token no valido');
      return res.status(404).json({ error: error.message });
    }

    //Si existe setemos token:null y confirmado:true
    veterinaryConfirm.token = null;
    veterinaryConfirm.confirmed = true;
    await veterinaryConfirm.save();

    return res.json({ smg: 'Veterinario confirmado correctamente' });
  } catch (error) {
    console.log(error);
  }
};

const loging = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ msg: 'email o password vacios' });

  try {
    //Verificamos si el usuario existe via email
    const veterinaryLogin = await Veterinary.findOne({ email });
    if (!veterinaryLogin) return res.status(401).json({ error: 'el usuario no existe' });

    //Verificamos si la cuenta esta verificada
    if (!veterinaryLogin.confirmed) return res.status(401).json({ error: 'Cuenta no verificada' });

    //Comprobamos el password
    const passwordCompare = await bcrypt.compare(password, veterinaryLogin.password);
    if (!passwordCompare) return res.status(401).json({ error: 'password incorrecta' });

    //Una vez que rerificamos y esta todo Ok generemos su token de session

    return res.json({ token: jwtGenerator(veterinaryLogin._id) });
  } catch (error) {
    console.log(error);
  }
};
const resetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(404).json({ msg: 'Email no valido' });

  try {
    //Comprobamos si ese email existe
    const veterinaryEmail = await Veterinary.findOne({ email });
    if (!veterinaryEmail) return res.status(404).json({ error: 'Email no encontrado' });

    //Genramos token y se lo envias a su correo
    veterinaryEmail.token = idGenerator();
    await veterinaryEmail.save();

    //Enviamos el email para resetear PWD
    sendResetPWD({
      name: veterinaryEmail.name,
      email,
      token: veterinaryEmail.token
    });

    return res.status(200).json({ msg: 'Hemos enviado un email con las instruccione' });
  } catch (error) {
    return res.status(500).json({ msg: 'Eror en el Servidor' });
  }
};

/* MIRAR ESTA PARTE POSIBLE MIDDLEWARE (checkToken)?*/
const checkToken = async (req, res) => {
  const { token } = req.params;

  const tokenValid = await Veterinary.findOne({ token });
  if (!tokenValid) return res.status(404).json({ error: 'Token no valido :(' });

  return res.status(200).json({ msg: 'Token valido :D' });
};

const newPwd = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  console.log(token);

  const veterinary = await Veterinary.findOne({ token });
  if (!veterinary) return res.status(404).json({ error: 'Usuario no encontrado' });

  try {
    veterinary.token = null;
    veterinary.password = newPassword;
    await veterinary.save();
    return res.status(200).json({ msg: 'Contraseña modificada correctamente' });
  } catch (error) {
    return res.status(500).json({ msg: 'Eror en el Servidor' });
  }
};

const profile = (req, res) => {
  const { veterinaryAuth } = req;
  console.log(veterinaryAuth);
  res.json(veterinaryAuth);
};

export { register, profile, confirm, loging, resetPassword, checkToken, newPwd };
