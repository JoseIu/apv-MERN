import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Alert from '../components/alerts/Alert';
import Loader from '../components/alerts/Loader';

const ConfirmAcc = () => {
	const params = useParams();
	const { token } = params;
	const { alert, setAlert, accConfirmed, setAccConfirmed } = useGetStates();

	useEffect(() => {
		setAlert(null);
		console.log('1');
		confirmAccount(token, setAlert);
	}, []);

	return (
		<div className='wrapper ConfirmAcc'>
			<div className='ConfirmAcc-container'>
				<h1 className='ConfirmAcc-title'>Confirmar tu cuenta y empiaza a administar</h1>
				<h2 className='ConfirmAcc-subtitle'>Tus pacientes</h2>
			</div>
			<div>{!alert ? <Loader /> : <Alert alert={alert} />}</div>
		</div>
	);
};
const useGetStates = () => {
	const [states, setStates] = useState({
		alert: {},
		accConfirmed: false
	});

	const setAlert = alert => {
		setStates({ ...states, alert });
	};
	const setAccConfirmed = accConfirmed => {
		setStates({ ...states, accConfirmed });
	};

	return {
		...states,
		setAlert,
		setAccConfirmed
	};
};
const confirmAccount = async (token, setAlert, setLoading) => {
	try {
		const url = `http://localhost:3000/api/veterinarios/confirmar/${token}`;
		const req = await fetch(url, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});
		const data = await req.json();
		const { smg, error } = data;
		console.log(data);
		if (!smg) {
			return setAlert({ msg: error, errorActive: true });
		}
		setAlert({ msg: smg, errorActive: false });
	} catch (error) {
		console.log(error);
	}
};
export default ConfirmAcc;
