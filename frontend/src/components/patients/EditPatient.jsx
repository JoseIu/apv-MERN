import { useEffect, useState } from 'react';
import conectDB from '../../helpers/ConectDB';
import usePatient from '../../hooks/usePatient';
import Alert from '../alerts/Alert';
import FormEmail from '../form-components/FormEmail';
import ForName from '../form-components/FormName';
import FormSubmit from '../form-components/FromSubmit';

const EditPatient = ({ modalEditPatient, setModalEditPatient }) => {
	const isActiveModalEdit = modalEditPatient ? 'Modal-active' : 'Modal-inactive';
	const { patientEdit } = usePatient();
	const {
		namePetEdit,
		setNamePet,
		nameOwnerEdit,
		setNameOwner,
		emailEdit,
		setEmail,
		dateEdit,
		setDate,
		symptomsEdit,
		setSymptoms,
		alert,
		setAlert
	} = useFormEditPatientValidate();
	useEffect(() => {
		setNamePet(patientEdit.name);
	}, [patientEdit]);
	const { msg } = alert;
	return (
		<section className={`Patients-form ${isActiveModalEdit}`}>
			<button className='Modal-close' onClick={() => setModalEditPatient(!modalEditPatient)}>
				X
			</button>
			{msg && <Alert alert={alert} />}
			<form
				className='Form'
				onSubmit={e =>
					FormEditPatientValidate(e, namePetEdit, nameOwnerEdit, emailEdit, dateEdit, symptomsEdit, setAlert)
				}
			>
				<ForName label={'Nombre mascota'} name={namePetEdit} setName={setNamePet} />
				<ForName label={'Nombre Dueño'} name={nameOwnerEdit} setName={setNameOwner} />
				<FormEmail email={emailEdit} setEmail={setEmail} />
				<div className='Form-date'>
					<label className='Form-label' htmlFor='date'>
						Fecha alta
					</label>
					<input
						className='Form-input'
						type='date'
						name='date'
						placeholder='nombre...'
						value={dateEdit}
						onChange={e => setDate(e.target.value)}
					/>
				</div>
				<div className='Form-email'>
					<label className='Form-label' htmlFor='symptoms'>
						Síntomas
					</label>
					<textarea
						className='Form-input'
						type='tex-area'
						name='symptoms'
						value={symptomsEdit}
						onChange={e => setSymptoms(e.target.value)}
					/>
				</div>

				<FormSubmit value={'Guardar Edición'} />
			</form>
		</section>
	);
};
const useFormEditPatientValidate = () => {
	const [validates, setValidates] = useState({
		namePetEdit: '',
		nameOwnerEdit: '',
		emailEdit: '',
		dateEdit: '',
		symptomsEdit: '',
		alert: {}
	});

	const setNamePet = namePetEdit => {
		setValidates({
			...validates,
			namePetEdit
		});
	};
	const setNameOwner = nameOwnerEdit => {
		setValidates({
			...validates,
			nameOwnerEdit
		});
	};
	const setEmail = emailEdit => {
		setValidates({
			...validates,
			emailEdit
		});
	};
	const setDate = dateEdit => {
		setValidates({
			...validates,
			dateEdit
		});
	};
	const setSymptoms = symptomsEdit => {
		setValidates({
			...validates,
			symptomsEdit
		});
	};
	const setAlert = alert => {
		setValidates({
			...validates,
			alert
		});
	};

	return {
		...validates,
		setNamePet,
		setNameOwner,
		setEmail,
		setDate,
		setSymptoms,
		setAlert
	};
};
const FormEditPatientValidate = async (e, namePet, nameOwner, email, date, symptoms, setAlert) => {
	e.preventDefault();

	if ([namePet, nameOwner, email, date, symptoms].includes(''))
		return setAlert({ msg: 'Todos lo campos son obligatorios', errorActive: true });
	setAlert({ msg: 'Paciente guardado correctamente', errorActive: false });

	const PATIENT = {
		name: namePet,
		owner: nameOwner,
		email,
		date,
		symptoms
	};
	try {
		const token = localStorage.getItem('token');
		const data = conectDB('pacientes/${}', 'PUT', PATIENT, token);
		console.log(data);
	} catch (error) {}
};
export default EditPatient;
