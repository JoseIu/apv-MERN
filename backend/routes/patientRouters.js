import express from 'express';
import {
  addPatients,
  deletePatient,
  getPatient,
  getPatients,
  updatePatient
} from '../controllers/patientControllers.js';
import checkAuth from '../middleware/authMiddleware.js';

const patientRounters = express.Router();

patientRounters.route('/').post(checkAuth, addPatients).get(checkAuth, getPatients);
patientRounters
  .route('/:id')
  .get(checkAuth, getPatient)
  .put(checkAuth, updatePatient)
  .delete(checkAuth, deletePatient);

export default patientRounters;
