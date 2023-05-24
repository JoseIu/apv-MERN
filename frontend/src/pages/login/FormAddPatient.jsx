import { useState } from 'react';
import Alert from '../../components/alerts/Alert';
import FormEmail from '../../components/form-components/FormEmail';
import ForName from '../../components/form-components/FormName';
import FormSubmit from '../../components/form-components/FromSubmit';
import conectDB from '../../helpers/ConectDB';
import usePatient from '../../hooks/usePatient';

const FormAddPatient = () => {
	const {
		namePet,
		setNamePet,
		nameOwner,
		setNameOwner,
		email,
		setEmail,
		date,
		setDate,
		symptoms,
		setSymptoms,
		alert,
		setAlert
	} = useFormAddPatientValidate();

	const { msg } = alert;

	return (
		<section
			className='Patients-form'
			onSubmit={e => FormAddPatientValidate(e, namePet, nameOwner, email, date, symptoms, setAlert)}
		>
			{msg && <Alert alert={alert} />}
			<form className='Form'>
				<ForName label={'Nombre mascota'} name={namePet} setName={setNamePet} />
				<ForName label={'Nombre Dueño'} name={nameOwner} setName={setNameOwner} />
				<FormEmail email={email} setEmail={setEmail} />
				<div className='Form-date'>
					<label className='Form-label' htmlFor='date'>
						Fecha alta
					</label>
					<input
						className='Form-input'
						type='date'
						name='date'
						placeholder='nombre...'
						value={date}
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
						value={symptoms}
						onChange={e => setSymptoms(e.target.value)}
					/>
				</div>

				<FormSubmit value={'Agregar Paciente'} />
			</form>
		</section>
	);
};

const useFormAddPatientValidate = () => {
	const [validates, setValidates] = useState({
		namePet: '',
		nameOwner: '',
		email: '',
		date: '',
		symptoms: '',
		alert: {}
	});

	const setNamePet = namePet => {
		setValidates({
			...validates,
			namePet
		});
	};
	const setNameOwner = nameOwner => {
		setValidates({
			...validates,
			nameOwner
		});
	};
	const setEmail = email => {
		setValidates({
			...validates,
			email
		});
	};
	const setDate = date => {
		setValidates({
			...validates,
			date
		});
	};
	const setSymptoms = symptoms => {
		setValidates({
			...validates,
			symptoms
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
const AddPatientsToState = patientSaved => {
	const { patients, setPatients } = usePatient();
	setPatients([patientSaved, ...patients]);
};
const FormAddPatientValidate = async (e, namePet, nameOwner, email, date, symptoms, setAlert) => {
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
		if (!token) return;
		const data = await conectDB('pacientes', 'POST', PATIENT, token);
		const { patientSaved } = data;
		console.log(patientSaved);
		// Agregamos al state de Patiens

		AddPatientsToState(patientSaved);
	} catch (error) {
		console.log(error);
	}
};

export default FormAddPatient;
