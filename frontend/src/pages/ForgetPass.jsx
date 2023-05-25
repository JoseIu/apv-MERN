import { useState } from 'react';
import Alert from '../components/alerts/Alert';
import FormEmail from '../components/form-components/FormEmail';
import FormNav from '../components/form-components/FormNav';
import FormSubmit from '../components/form-components/FormSubmit';
import conectDB from '../helpers/ConectDB';

const ForgetPass = () => {
	const [email, setEmail] = useState('');
	const [alert, setAlert] = useState({});

	const handelSumbmit = async e => {
		e.preventDefault();
		console.log('desde handelSumbmit');

		if (email === '') return setAlert({ msg: 'El email no es valido', errorActive: true });

		try {
			const data = await conectDB('veterinarios/olvide-password', 'POST', { email });

			const { msg, error } = data;
			if (error) return setAlert({ msg: error, errorActive: true });

			setAlert({ msg, errorActive: false });
			console.log(data);
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
			<form action='POST' className='Form' onSubmit={handelSumbmit}>
				<FormEmail email={email} setEmail={setEmail} />
				<FormSubmit value={'Enviar email'} />
			</form>
			<FormNav
				path={'/'}
				value={'¿Tienes cuenta?, Inicia sesión!'}
				path2={'/registrar'}
				value2={'¿No tienes cuenta?, registrate!'}
			/>
		</div>
	);
};

export default ForgetPass;
