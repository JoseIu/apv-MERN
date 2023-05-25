import Patient from '../models/Patient.js';

const addPatients = async (req, res) => {
  const { name, owner, email, symptoms } = req.body;

  const patient = new Patient(req.body);
  patient.veterinary = req.veterinaryAuth._id;

  try {
    const patientSaved = await patient.save();
    res.status(200).json({ smg: 'paciente guardado correctamente', patientSaved });
  } catch (error) {
    console.log(error);
  }
};

const getPatients = async (req, res) => {
  const { veterinaryAuth } = req;
  const patients = await Patient.find().where('veterinary').equals(veterinaryAuth);
  res.json(patients);
};

const getPatient = async (req, res) => {
  //id del paciente
  const { id } = req.params;
  // veterinario logeado/auntenticado
  const { veterinaryAuth } = req;

  const patient = await Patient.findById(id);
  if (!patient) return res.status(404).json({ smg: 'Paciente no encontrado' });

  const { veterinary } = patient;

  //comprovamos si el idVeterianry del cliente con el id de veterinario
  if (veterinary._id.toString() !== veterinaryAuth._id.toString()) return res.json({ smg: 'Acción no valida' });

  res.json(patient);
};

const updatePatient = async (req, res) => {
  //id del paciente by URL
  const { id } = req.params;
  console.log(id);
  // veterinario logeado/auntenticado
  const { veterinaryAuth } = req;

  // const patientId = new mongoose.Types.ObjectId(id);
  const patient = await Patient.findById(id);
  console.log(patient._id);
  console.log(patient._id.equals(id));
  if (!patient) return res.status(404).json({ smg: 'Paciente no encontrado' });

  const { veterinary } = patient;

  //comprovamos si el idVeterianry del cliente con el id de veterinario
  if (veterinary._id.toString() !== veterinaryAuth._id.toString()) return res.json({ smg: 'Acción no valida' });

  //actualizamos paciente
  const { name, owner, email, date, symptoms } = req.body;
  console.log(name, owner, email, date, symptoms);

  try {
    patient.name = name;
    patient.owner = owner;
    patient.email = email;
    patient.date = date;
    patient.symptoms = symptoms;

    await patient.save();
    return res.json({ msg: 'Paciente actualizado correctamente' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Error al actualizar el paciente' });
  }
};
const deletePatient = async (req, res) => {
  //id del paciente
  const { id } = req.params;
  // veterinario logeado/auntenticado
  const { veterinaryAuth } = req;

  const patient = await Patient.findById(id);
  if (!patient) return res.status(404).json({ smg: 'Paciente no encontrado' });

  const { veterinary } = patient;

  //comprovamos si el idVeterianry del cliente con el id de veterinario
  if (veterinary._id.toString() !== veterinaryAuth._id.toString()) return res.json({ smg: 'Acción no valida' });

  try {
    await patient.deleteOne();
    res.json({ sm: 'Paciente eliminado' });
  } catch (error) {
    console.log(error);
  }
};

export { addPatients, getPatients, getPatient, updatePatient, deletePatient };
