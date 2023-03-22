import { useState } from 'react';
import FormEmail from '../components/form-components/FormEmail';
import FormNav from '../components/form-components/FormNav';
import FormPassword from '../components/form-components/FormPassword';
import FormSubmit from '../components/form-components/FromSubmit';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		validateForm(name, email, password);
	};

	return (
		<div className='Register wrapper'>
			<a className='Logo' href='#'>
				LOGO
			</a>
			<form action='POST' className='Form' onSubmit={handleSubmit}>
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
const validateForm = (e, name, email, password) => {
	if ([name, email, password].includes('')) return console.log('Todos los campos son necesario');
};
export default Register;
