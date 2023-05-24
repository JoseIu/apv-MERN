import { createContext, useState } from 'react';

const PatientContext = createContext();

const PatientProvider = ({ children }) => {
	const [patients, setPatients] = useState([]);
	return <PatientContext.Provider value={{ patients, setPatients }}>{children}</PatientContext.Provider>;
};

export { PatientProvider };
export default PatientContext;
