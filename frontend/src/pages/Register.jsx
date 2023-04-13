import { useState } from 'react';
import Alert from '../components/alerts/Alert';
import FormEmail from '../components/form-components/FormEmail';
import FormNav from '../components/form-components/FormNav';
import FormPassword from '../components/form-components/FormPassword';
import FormSubmit from '../components/form-components/FromSubmit';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [alert, setAlert] = useState({});

	const handleSubmit = async e => {
		e.preventDefault();
		console.log('desde handle');
		if ([name, email, password].includes('')) {
			return setAlert({ msg: 'Todos los campos vacios', errorActive: true });
		}
		setAlert({});

		// enviamos los datos para registrar
		try {
			const url = 'http://localhost:3000/api/veterinarios';
			const req = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, password })
			});
			const data = await req.json();

			const { error } = data;
			if (error) {
				return setAlert({ msg: error, errorActive: true });
			}
			setAlert({ msg: 'creado correctamente revisa tu correo', errorActive: false });
		} catch (error) {
			console.log(error);
		}
	};
	const { msg } = alert;

	return (
		<div className='Register wrapper'>
			<a className='Logo' href='#'>
				LOGO
			</a>
			{msg && <Alert alert={alert} />}

			<form className='Form' onSubmit={handleSubmit}>
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
// const validateForm = (e, name, email, password, setAlert) => {
// 	if ([name, email, password].includes('')) return setAlert({ smg: 'Todos los campos son necesario' });
// };
export default Register;
