import FormEmail from '../components/form-components/FormEmail';
import FormNav from '../components/form-components/FormNav';
import FormPassword from '../components/form-components/FormPassword';
import FormSubmit from '../components/form-components/FromSubmit';

const Register = () => (
	<div className='Register wrapper'>
		<a className='Logo' href='#'>
			LOGO
		</a>
		<form action='POST' className='Form'>
			<div className='Form-name'>
				<label className='Form-label' htmlFor='name'>
					Nombre
				</label>
				<input className='Form-input' type='text' name='name' placeholder='nombre...' />
			</div>
			<FormEmail />
			<FormPassword />
			<FormSubmit value={'Registrarse'} />
		</form>
		<FormNav path={'/'} value={'¿Tienes cuenta?, Inicia sesión!'} />
	</div>
);
export default Register;
