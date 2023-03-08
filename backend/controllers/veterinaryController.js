import bcrypt from 'bcrypt';
import jwtGenerator from '../helpers/jwtGenerator.js';
import Veterinary from '../models/Veterinary.js';

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.sendStatus(400);

  //Evitamos usuarios duplicados
  const existVeterinary = await Veterinary.findOne({ email });
  if (existVeterinary) return res.status(409).json({ error: 'este email ya esta registrado' });

  try {
    //Guarda nuevo Veterinario
    const veterinary = new Veterinary(req.body);
    const veterinarySaved = await veterinary.save();

    res.json(veterinarySaved);
  } catch (error) {
    console.log(error);
  }
};

const confirm = async (req, res) => {
  const { token } = req.params;

  try {
    //Verificamos si el token existe
    const veterinaryConfirm = await Veterinary.findOne({ token });

    if (!veterinaryConfirm) {
      const error = new Error('token no valido');
      return res.status(404).json({ smg: error.message });
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

const profile = (req, res) => {
  res.json({ smg: 'Desde perfil' });
};

export { register, profile, confirm, loging };
