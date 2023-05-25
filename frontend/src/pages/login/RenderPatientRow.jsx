import { Link } from 'react-router-dom';
import DeleteIcon from '../../components/patients/DeleteIcon';
import EditIcon from '../../components/patients/EditIcon';

import usePatient from '../../hooks/usePatient';

const RenderPatientRow = patient => {
	const { date, email, name, owner, symptoms } = patient;
	const { editPatient, deltePatient } = usePatient();
	const formatDatee = dateFormat(date);

	return (
		<li className='Patients-row'>
			<div className='Patients-name'>{name}</div>
			<div className='Patients-owner'>{owner}</div>
			<div className='Patients-email'>{email}</div>
			<div className='Patients-date'>{formatDatee}</div>
			<div className='Patients-symptoms'>{symptoms}</div>
			<div className='Patients-actions'>
				<Link to={'edit-paciente'} onClick={() => editPatient(patient)}>
					<EditIcon />
				</Link>
				<button onClick={() => deltePatient(patient._id)}>
					<DeleteIcon />
				</button>
			</div>
		</li>
	);
};

const dateFormat = date => {
	const fechaBack = date;
	const datFormat = new Date(fechaBack);
	const day = datFormat.getDate();
	const month = datFormat.getMonth() + 1;
	const year = datFormat.getFullYear();

	const formatDate = `${day}/${month}/${year}`;
	return formatDate;
};

export default RenderPatientRow;
