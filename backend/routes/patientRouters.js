import express from 'express';
import { addPatients, getPatients } from '../controllers/patientControllers.js';
import checkAuth from '../middleware/authMiddleware.js';

const patientRounters = express.Router();

patientRounters.route('/').post(checkAuth, addPatients).get(checkAuth, getPatients);

export default patientRounters;
