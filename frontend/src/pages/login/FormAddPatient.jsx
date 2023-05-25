import { useState } from 'react';
import Alert from '../../components/alerts/Alert';
import FormEmail from '../../components/form-components/FormEmail';
import ForName from '../../components/form-components/FormName';
import FormSubmit from '../../components/form-components/FormSubmit';
import usePatient from '../../hooks/usePatient';

const FormAddPatient = () => {
	const { addAndSavePatient, alert, setAlert } = usePatient();
	const { namePet, setNamePet, nameOwner, setNameOwner, email, setEmail, date, setDate, symptoms, setSymptoms } =
		useFormAddPatientValidate();

	const { msg } = alert;

	return (
		<section
			className='Patients-form'
			onSubmit={e =>
				FormAddPatientValidate(e, namePet, nameOwner, email, date, symptoms, setAlert, addAndSavePatient)
			}
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
const FormAddPatientValidate = async (
	e,
	namePet,
	nameOwner,
	email,
	date,
	symptoms,
	setAlert,
	addAndSavePatient
) => {
	e.preventDefault();

	if ([namePet, nameOwner, email, date, symptoms].includes(''))
		return setAlert({ msg: 'Todos lo campos son obligatorios', errorActive: true });

	const PATIENT = {
		name: namePet,
		owner: nameOwner,
		email,
		date,
		symptoms
	};

	addAndSavePatient(PATIENT);
};

export default FormAddPatient;
