import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../../components/alerts/Alert';
import FormEmail from '../../components/form-components/FormEmail';
import ForName from '../../components/form-components/FormName';
import FormSubmit from '../../components/form-components/FormSubmit';
import conectDB from '../../helpers/ConectDB';
import usePatient from '../../hooks/usePatient';

const EditPatient = () => {
	const { patientEdit } = usePatient();
	const navigate = useNavigate();

	const {
		namePetEdit,
		setNamePetEdit,
		nameOwnerEdit,
		setNameOwnerEdit,
		emailEdit,
		setEmailEdit,
		dateEdit,
		setDateEdit,
		symptomsEdit,
		setSymptomsEdit,
		alert,
		setAlert
	} = useFormEditPatientValidate();

	useEffect(() => {
		if (patientEdit?.name) {
			setNamePetEdit(patientEdit.name);
			setNameOwnerEdit(patientEdit.owner);
			setEmailEdit(patientEdit.email);
			setDateEdit(patientEdit.date);
			setSymptomsEdit(patientEdit.symptoms);
		}
	}, [patientEdit]);

	const { msg } = alert;
	return (
		<section className='Patients-form'>
			<Link to={'/admin'}>Volver</Link>
			{msg && <Alert alert={alert} />}
			<form
				className='Form'
				onSubmit={e =>
					FormEditPatientValidate(
						e,
						namePetEdit,
						nameOwnerEdit,
						emailEdit,
						dateEdit,
						symptomsEdit,
						setAlert,
						patientEdit._id,
						navigate
					)
				}
			>
				<ForName label={'Nombre mascota'} name={namePetEdit} setName={setNamePetEdit} />
				<ForName label={'Nombre Dueño'} name={nameOwnerEdit} setName={setNameOwnerEdit} />
				<FormEmail email={emailEdit} setEmail={setEmailEdit} />
				<div className='Form-date'>
					<label className='Form-label' htmlFor='date'>
						Fecha alta
					</label>
					<input
						className='Form-input'
						type='date'
						name='date'
						placeholder='nombre...'
						value={dateEdit ? dateEdit.slice(0, 10) : ''}
						onChange={e => setDateEdit(e.target.value)}
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
						onChange={e => setSymptomsEdit(e.target.value)}
					/>
				</div>

				<FormSubmit value={'Guardar Edición'} />
			</form>
		</section>
	);
};
const useFormEditPatientValidate = () => {
	const [namePetEdit, setNamePetEdit] = useState('');
	const [nameOwnerEdit, setNameOwnerEdit] = useState('');
	const [emailEdit, setEmailEdit] = useState('');
	const [dateEdit, setDateEdit] = useState('');
	const [symptomsEdit, setSymptomsEdit] = useState('');
	const [alert, setAlert] = useState({});

	return {
		namePetEdit,
		setNamePetEdit,
		nameOwnerEdit,
		setNameOwnerEdit,
		emailEdit,
		setEmailEdit,
		dateEdit,
		setDateEdit,
		symptomsEdit,
		setSymptomsEdit,
		alert,
		setAlert
	};
};

const FormEditPatientValidate = async (e, name, owner, email, date, symptoms, setAlert, id, navigate) => {
	e.preventDefault();

	if ([name, owner, email, date, symptoms].includes(''))
		return setAlert({ msg: 'Todos lo campos son obligatorios', errorActive: true });

	const PATIENT = {
		name,
		owner,
		email,
		date,
		symptoms
	};
	try {
		console.log(id);
		const token = localStorage.getItem('token');
		const data = await conectDB(`pacientes/${id}`, 'Put', PATIENT, token);
		const { msg } = data;
		setAlert({ msg, errorActive: false });

		setTimeout(() => {
			navigate('/admin');
		}, 1500);

		console.log(data);
	} catch (error) {
		console.log(error);
	}
};

export default EditPatient;
