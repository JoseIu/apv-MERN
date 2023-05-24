import { useContext } from 'react';
import PatientContext from '../context/PatientsProvider';

const usePatient = () => {
	return useContext(PatientContext);
};

export default usePatient;
