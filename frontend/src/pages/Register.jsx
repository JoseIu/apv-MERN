import { useState } from 'react';
import Alert from '../components/alerts/Alert';
import FormEmail from '../components/form-components/FormEmail';
import FormNav from '../components/form-components/FormNav';
import FormPassword from '../components/form-components/FormPassword';
import FormSubmit from '../components/form-components/FromSubmit';
import conectDB from '../helpers/ConectDB';

const Register = () => {
	const { name, setName, email, setEmail, password, setPassword, alert, setAlert } = useGetStates();

	const { msg } = alert;
	console.log(import.meta.env.VITE_BACKED_URL);

	return (
		<div className='Register wrapper'>
			<a className='Logo' href='#'>
				LOGO
			</a>
			{msg && <Alert alert={alert} />}

			<form className='Form' onSubmit={e => fromValidator(e, name, email, password, setAlert)}>
				<div className='Form-name'>
					<label className='Form-label' htmlFor='name'>
						Nombre
					</label>
					<input
						className='Form-input'
						type='text'
						name='name'
						placeholder='nombre...'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</div>
				<FormEmail email={email} setEmail={setEmail} />
				<FormPassword password={password} setPassword={setPassword} />
				<FormSubmit value={'Registrarse'} />
			</form>
			<FormNav
				path={'/'}
				value={'¿Tienes cuenta?, Inicia sesión!'}
				path2={'/olvide-password'}
				value2={'Olvide mi contraseña'}
			/>
		</div>
	);
};
const useGetStates = () => {
	const [validates, setValidates] = useState({
		name: '',
		email: '',
		password: '',
		alert: {}
	});

	const setName = name => {
		setValidates({
			...validates,
			name
		});
	};
	const setEmail = email => {
		setValidates({
			...validates,
			email
		});
	};
	const setPassword = password => {
		setValidates({
			...validates,
			password
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
		setName,
		setEmail,
		setPassword,
		setAlert
	};
};
const fromValidator = async (e, name, email, password, setAlert) => {
	e.preventDefault();

	if ([name, email, password].includes('')) {
		return setAlert({ msg: 'Todos los campos son obligatorios', errorActive: true });
	}

	// setAlert({});

	// enviamos los datos para registrar
	try {
		const data = await conectDB('veterinarios', 'POST', { name, email, password });

		const { error } = data;
		if (error) {
			return setAlert({ msg: error, errorActive: true });
		}
		setAlert({ msg: 'creado correctamente revisa tu correo', errorActive: false });
	} catch (error) {
		console.log(error);
	}
};

export default Register;
