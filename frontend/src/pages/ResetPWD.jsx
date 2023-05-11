import { useState } from 'react';
import Alert from '../components/alerts/Alert';
import FormPassword from '../components/form-components/FormPassword';
import FormSubmit from '../components/form-components/FromSubmit';

const ResetPWD = () => {
	const [newPassword, setNewPassWord] = useState('');
	const [alert, setAlert] = useState({});

	const handelSumbmit = e => {
		e.preventDefault();
		if (newPassword === '') return setAlert({ msg: 'El campo es obligatorio', errorActive: true });
	};

	const { msg } = alert;
	return (
		<>
			<div className='reset-pwd wrapper'>
				{msg && <Alert alert={alert} />}
				<form className='Form' onSubmit={e => handelSumbmit(e, newPassword)}>
					<FormPassword password={newPassword} setPassword={setNewPassWord} />
					<FormSubmit value={'Cambiar Contraseña'} />
				</form>
			</div>
		</>
	);
};

export default ResetPWD;
