import { createContext, useState } from 'react';

const PatientContext = createContext();

const PatientProvider = ({ children }) => {
	const [patients, setPatients] = useState([]);
	const [patient, setPatient] = useState({});
	const [patientEdit, setPatientEdit] = useState({});

	const [patientDelete, setPatientDelete] = useState({});

	const editPatient = pacient => {
		setPatientEdit(pacient);
	};

	return (
		<PatientContext.Provider
			value={{
				patients,
				setPatients,
				patient,
				setPatient,
				patientEdit,
				setPatientEdit,
				patientDelete,
				setPatientDelete,
				editPatient
			}}
		>
			{children}
		</PatientContext.Provider>
	);
};

export { PatientProvider };
export default PatientContext;
