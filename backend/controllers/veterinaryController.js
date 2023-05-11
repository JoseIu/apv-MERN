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

    res.json(veterinarySaved);
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

    res.json({ smg: 'Veterinario confirmado correctamente' });
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
    if (!veterinaryLogin) return res.status(401).json({ msg: 'el usuario no existe' });

    //Verificamos si la cuenta esta verificada
    if (!veterinaryLogin.confirmed) return res.status(401).json({ msg: 'Cuenta no verificada' });

    //Comprobamos el password
    const passwordCompare = await bcrypt.compare(password, veterinaryLogin.password);
    if (!passwordCompare) return res.status(401).json({ msg: 'password incorrecta' });

    //Una vez que rerificamos y esta todo Ok generemos su token de session

    res.json({ token: jwtGenerator(veterinaryLogin._id) });
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
    if (!veterinaryEmail) res.status(404).json({ msg: 'Email no encontrado' });

    //Genramos token y se lo envias a su correo
    veterinaryEmail.token = idGenerator();
    await veterinaryEmail.save();

    //Enviamos el email para resetear PWD
    sendResetPWD({
      name: veterinaryEmail.name,
      email,
      token: veterinaryEmail.token
    });

    return res.status(200).json({ msg: 'Emos enviado un email con las instrucciones' });
  } catch (error) {
    return res.status(500).json({ msg: 'Eror en el Servidor' });
  }
};

/* MIRAR ESTA PARTE POSIBLE MIDDLEWARE (checkToken)?*/
const checkToken = async (req, res) => {
  const { token } = req.params;

  const tokenValid = await Veterinary.findOne({ token });
  if (!tokenValid) return res.status(404).json({ msg: 'Token no valido' });

  res.status(200).json({ msg: 'Token valido' });
};
const newPwd = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const veterinary = await Veterinary.findOne({ token });
  if (!veterinary) return res.status(404).json({ msg: 'Token no valido' });

  try {
    veterinary.token = null;
    veterinary.password = password;
    await veterinary.save();
    res.status(200).json({ msg: 'Contraseña modificada correctamente' });
  } catch (error) {
    return res.status(500).json({ msg: 'Eror en el Servidor' });
  }
};

const profile = (req, res) => {
  const { veterinaryAuth } = req;
  res.json({ perfil: veterinaryAuth });
};

export { register, profile, confirm, loging, resetPassword, checkToken, newPwd };
