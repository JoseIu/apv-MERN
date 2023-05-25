import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddIcont from '../../components/patients/AddIcon';
import usePatient from '../../hooks/usePatient';
import RenderPatientsList from './RenderUsersList';

const PatientAdministrator = () => {
	const { patients, setPatients, getPatients } = usePatient();

	useEffect(() => {
		getPatients(setPatients);
	}, []);
	return (
		<section className='wrapper Patients'>
			<div className='FormFilter'>
				<form className='Form'>Formularo De Busqueda</form>
			</div>
			<div className='Patients-container'>
				<Link to='add-paciente'>
					<AddIcont className={'Patients-add'} />
				</Link>
				<ul className='Patients-List'>
					<li className='Patients-header'>
						<header className='Patients-headerContent'>
							<div className='Patients-name'>Nombre</div>
							<div className='Patients-owner'>Dueño</div>
							<div className='Patients-email'>Email</div>
							<div className='Patients-date'>Cita</div>
							<div className='Patients-symptoms'>Síntomas</div>
						</header>
					</li>
					<RenderPatientsList patients={patients} />
				</ul>
			</div>
		</section>
	);
};
export default PatientAdministrator;
