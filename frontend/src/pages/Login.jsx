import { useState } from 'react';
import Alert from '../components/alerts/Alert';
import FormEmail from '../components/form-components/FormEmail';
import FormNav from '../components/form-components/FormNav';
import FormPassword from '../components/form-components/FormPassword';

import { useNavigate } from 'react-router-dom';
import FormSubmit from '../components/form-components/FormSubmit';
import conectDB from '../helpers/ConectDB';
import useAuth from '../hooks/useAuth';

const Login = () => {
	const { email, setEmail, password, setPassword, alert, setAlert } = useFormStates();
	const { setAuth } = useAuth();
	const navigate = useNavigate();
	const handleSubmit = async e => {
		e.preventDefault();

		if ([email, password].includes(''))
			return setAlert({ msg: 'Todos los campos son obligatorios', errorActive: true });

		try {
			const data = await conectDB('veterinarios/login', 'POST', { email, password }, null);
			console.log(data);

			const { error, token } = data;
			if (error) return setAlert({ msg: error, errorActive: true });

			localStorage.setItem('token', token);
			setAuth(data);
			// redireccionamos una vez logeado
			navigate('/admin');
		} catch (error) {
			console.log(error);
		}
	};

	const { msg } = alert;
	return (
		<div className='Login wrapper'>
			<a className='Logo' href='#'>
				LOGO
			</a>
			{msg && <Alert alert={alert} />}
			<form method='POST' className='Form' onSubmit={handleSubmit}>
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

export default Login;
