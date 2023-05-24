import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddIcont from '../../components/patients/AddIcon';
import conectDB from '../../helpers/ConectDB';
import usePatient from '../../hooks/usePatient';
import RenderPatientsList from './RenderUsersList';

const PatientAdministrator = () => {
	const { patients, setPatients } = usePatient();

	useEffect(() => {
		getPatients(setPatients);
	}, []);
	return (
		<section className='wrapper Patients'>
			<div>
				<form className='Form FormLogin'>Formularo De Busqueda</form>
			</div>
			<div className='Patients-container'>
				<Link to='add-paciente'>
					<AddIcont className={'Patients-add'} />
				</Link>
				<ul className='Patients-List'>
					<RenderPatientsList patients={patients} />
				</ul>
			</div>
		</section>
	);
};

const getPatients = async setPatients => {
	try {
		const token = localStorage.getItem('token');
		const data = await conectDB('pacientes', 'GET', null, token);
		setPatients(data);
	} catch (error) {
		console.log(error);
	}
};
export default PatientAdministrator;
