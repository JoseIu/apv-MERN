import { useState } from 'react';
import Alert from '../components/alerts/Alert';
import FormEmail from '../components/form-components/FormEmail';
import FormNav from '../components/form-components/FormNav';
import FormPassword from '../components/form-components/FormPassword';
import FormSubmit from '../components/form-components/FromSubmit';
import conectDB from '../helpers/ConectDB';

const Login = () => {
	const { email, setEmail, password, setPassword, alert, setAlert } = useFormStates();

	const { msg } = alert;
	return (
		<div className='Login wrapper'>
			<a className='Logo' href='#'>
				LOGO
			</a>
			{msg && <Alert alert={alert} />}
			<form action='POST' className='Form' onSubmit={e => handleSubmit(e, email, password, setAlert)}>
				<FormEmail email={email} setEmail={setEmail} />
				<FormPassword password={password} setPassword={setPassword} />
				<FormSubmit value={'Iniciar sesión'} />
			</form>
			<FormNav
				path={'/registrar'}
				value={'¿No tienes cuenta?, registrate aquí!'}
				path2={'/olvide-password'}
				value2={'Olvide mi contraseña'}
			/>
		</div>
	);
};

const useFormStates = () => {
	const [validates, setValidates] = useState({
		email: '',
		password: '',
		alert: {}
	});
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
		setEmail,
		setPassword,
		setAlert
	};
};

const handleSubmit = async (e, email, password, setAlert) => {
	e.preventDefault();

	if ([email, password].includes(''))
		return setAlert({ msg: 'Todos los campos son obligatorios', errorActive: true });

	try {
		const data = await conectDB('veterinarios/login', 'POST', { email, password });
		console.log(data);
		const { error, token } = data;

		if (error) return setAlert({ msg: error, errorActive: true });

		localStorage.setItem('token', token);
	} catch (error) {
		console.log(error);
	}
};
export default Login;
