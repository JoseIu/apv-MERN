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

export { addPatients, getPatients };
