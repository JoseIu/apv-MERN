import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Alert from '../components/alerts/Alert';
import FormPassword from '../components/form-components/FormPassword';
import FormSubmit from '../components/form-components/FormSubmit';
import conectDB from '../helpers/ConectDB';

const ResetPWD = () => {
	const [newPassword, setNewPassWord] = useState('');
	const [alert, setAlert] = useState({});
	const [validToken, setValidToken] = useState(false);

	const { token } = useParams();

	useEffect(() => {
		validateToken(token, setAlert, setValidToken);
	}, []);

	const { msg } = alert;
	return (
		<>
			<div className='reset-pwd wrapper'>
				<form className='Form' onSubmit={e => handelSumbmit(e, token, newPassword, setAlert)}>
					{msg && <Alert alert={alert} />}
					{validToken && (
						<>
							<FormPassword password={newPassword} setPassword={setNewPassWord} />
							<FormSubmit value={'Cambiar Contraseña'} />
						</>
					)}
				</form>
			</div>
		</>
	);
};

const validateToken = async (token, setAlert, setValidToken) => {
	try {
		const data = await conectDB(`veterinarios/olvide-password/${token}`, 'GET', null);
		const { error } = data;

		if (error) return setAlert({ msg: 'Error en el enlace :(', errorActive: true });

		setValidToken(true);
	} catch (error) {
		console.log(error);
	}
};
const handelSumbmit = async (e, token, newPassword, setAlert) => {
	e.preventDefault();

	if (newPassword === '') return setAlert({ msg: 'El campo es obligatorio', errorActive: true });

	try {
		const data = await conectDB(`veterinarios/olvide-password/${token}`, 'POST', { newPassword });
		const { msg } = data;
		setAlert({ msg, errorActive: false });
		console.log(data);
	} catch (error) {
		console.log(error);
	}
};

export default ResetPWD;
