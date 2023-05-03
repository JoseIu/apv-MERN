import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ConfirmAcc = () => {
	const params = useParams();
	const { token } = params;

	useEffect(() => {
		console.log('1');
		confirmAccount(token);
	}, []);

	return (
		<div className='wrapper ConfirmAcc'>
			<div className='ConfirmAcc-container'>
				<h1 className='ConfirmAcc-title'>Confirmar tu cuenta y empiaza a administar</h1>
				<h2 className='ConfirmAcc-subtitle'>Tus pacientes</h2>
			</div>
			{/* <Alert alert={{ msg: 'Holaa' }} /> */}
		</div>
	);
};

const confirmAccount = async token => {
	try {
		const url = `http://localhost:3000/api/veterinarios/confirmar/${token}`;
		const req = await fetch(url, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});
		const data = await req.json();
		console.log(data);
	} catch (error) {
		console.log(error);
	}
};
export default ConfirmAcc;
