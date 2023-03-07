import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import idGenerator from '../helpers/idGenerator.js';
//Definimos el esquema/tabla
const veterinarySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phone: {
    type: String,
    default: null,
    trim: true
  },
  web: {
    type: String,
    default: null
  },
  token: {
    type: String,
    default: idGenerator()
  },
  confirmed: {
    type: Boolean,
    default: false
  }
});

//Hash de PWD
veterinarySchema.pre('save', async function (next) {
  //comprobamos si ya esta hasheado y prevenimos que lo hashee por segunda vez
  if (!this.isModified('password')) next();

  //Hasheamos el pwd
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Veterinary = mongoose.model('Veterinary', veterinarySchema);

export default Veterinary;
