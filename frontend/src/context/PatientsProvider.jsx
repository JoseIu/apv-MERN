import { createContext, useState } from 'react';
import conectDB from '../helpers/ConectDB';

const PatientContext = createContext();

const PatientProvider = ({ children }) => {
	const [alert, setAlert] = useState('');
	const [patients, setPatients] = useState([]);
	const [patientEdit, setPatientEdit] = useState({});

	const [patientDelete, setPatientDelete] = useState({});

	const getPatients = async setPatients => {
		try {
			const token = localStorage.getItem('token');
			const data = await conectDB('pacientes', 'GET', null, token);
			setPatients(data);
		} catch (error) {
			console.log(error);
		}
	};

	const addAndSavePatient = async patient => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;
			const data = await conectDB('pacientes', 'POST', patient, token);
			const { smg } = data;
			setAlert({ msg: smg, errorActive: false });
		} catch (error) {
			console.log(error);
		}
	};
	const editPatient = patient => {
		console.log(patient);
		setPatientEdit(patient);
	};

	return (
		<PatientContext.Provider
			value={{
				patients,
				setPatients,
				patientEdit,
				setPatientEdit,
				patientDelete,
				setPatientDelete,
				getPatients,
				addAndSavePatient,
				editPatient,
				alert,
				setAlert
			}}
		>
			{children}
		</PatientContext.Provider>
	);
};

export { PatientProvider };
export default PatientContext;
