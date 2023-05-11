import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Alert from '../components/alerts/Alert';
import Loader from '../components/alerts/Loader';
import FormNav from '../components/form-components/FormNav';
import conectDB from '../helpers/ConectDB';

const ConfirmAcc = () => {
	const params = useParams();
	const { token } = params;
	const { alert, setAlert, accConfirmed, setAccConfirmed } = useGetStates();

	useEffect(() => {
		setAlert(null);
		console.log('1');
		confirmAccount(token, setAlert, accConfirmed, setAccConfirmed);
	}, []);
	return (
		<div className='wrapper ConfirmAcc'>
			<div className='ConfirmAcc-container'>
				<h1 className='ConfirmAcc-title'>
					Confirmar tu cuenta y empieza a administrar<span className='ConfirmAcc-subtitle'> Tus pacientes</span>
				</h1>
				{/* <h2 className='ConfirmAcc-subtitle'>Tus pacientes</h2> */}
			</div>
			<div className='ConfirmAcc-message'>
				{!alert ? <Loader /> : <Alert alert={alert} />}
				{accConfirmed && <FormNav path={'/'} value={'Iniciar sesión'} />}
			</div>
		</div>
	);
};
const useGetStates = () => {
	const [states, setStates] = useState({
		alert: {},
		accConfirmed: false
	});

	const setAlert = alert => {
		// setStates({ ...states, alert });
		setStates(prevStates => ({ ...prevStates, alert }));
	};
	const setAccConfirmed = accConfirmed => {
		// setStates({ ...states, accConfirmed });
		setStates(prevStates => ({ ...prevStates, accConfirmed }));
	};

	return {
		...states,
		setAlert,
		setAccConfirmed
	};
};
const confirmAccount = async (token, setAlert, setAccConfirmed) => {
	try {
		const data = await conectDB(`veterinarios/confirmar/${token}`, 'GET', null);
		const { smg, error } = data;
		console.log(smg);
		console.log(data);
		if (error) {
			return setAlert({ msg: error, errorActive: true });
		}
		setAlert({ msg: smg, errorActive: false });
		setAccConfirmed(true);
	} catch (error) {
		console.log(error);
	}
};
export default ConfirmAcc;
