import { useState } from 'react';
import DeletePatient from '../../components/patients/DeletPatient';
import EditIcon from '../../components/patients/EditIcon';
import EditPatient from '../../components/patients/EditPatient';
import usePatient from '../../hooks/usePatient';

const RenderPatientRow = patient => {
	const { date, email, name, owner, symptoms } = patient;
	const [modalEditPatient, setModalEditPatient] = useState(false);
	const { editPatient } = usePatient();
	const formatDatee = dateFormat(date);

	return (
		<li className='Patients-row'>
			<div className='Patients-name'>{name}</div>
			<div className='Patients-owner'>{owner}</div>
			<div className='Patients-email'>{email}</div>
			<div className='Patients-date'>{formatDatee}</div>
			<div className='Patients-symptoms'>{symptoms}</div>
			<div className='Patients-actions'>
				<button
					onClick={() => {
						setModalEditPatient(!modalEditPatient);
						editPatient(patient);
					}}
				>
					<EditIcon />
				</button>
				{
					// Mostramos modal para el formulario
					modalEditPatient ? (
						<EditPatient modalEditPatient={modalEditPatient} setModalEditPatient={setModalEditPatient} />
					) : (
						''
					)
				}
				<DeletePatient patient={patient} />
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
