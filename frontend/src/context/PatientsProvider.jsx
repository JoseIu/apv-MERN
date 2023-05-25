import { createContext, useState } from 'react';
import conectDB from '../helpers/ConectDB';

const PatientContext = createContext();

const PatientProvider = ({ children }) => {
	const [alert, setAlert] = useState('');
	const [patients, setPatients] = useState([]);
	const [patientEdit, setPatientEdit] = useState({});

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
		setPatientEdit(patient);
	};
	const deltePatient = async id => {
		const confirmDelte = confirm('¿Deseas BORRAR este paciente?');
		if (confirmDelte) {
			try {
				const token = localStorage.getItem('token');
				if (!token) return;
				const data = await conectDB(`pacientes/${id}`, 'DELETE', null, token);
				const { smg } = data;
				setAlert({ msg: smg, errorActive: false });

				// actualizamos el front (para que sea reactivo)
				const patientDelete = patients.filter(patient => patient._id !== id);
				setPatients(patientDelete);
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<PatientContext.Provider
			value={{
				patients,
				setPatients,
				patientEdit,
				setPatientEdit,
				getPatients,
				addAndSavePatient,
				editPatient,
				deltePatient,
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
