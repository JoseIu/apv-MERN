import FormEmail from '../components/form-components/FormEmail';
import FormNav from '../components/form-components/FormNav';
import FormPassword from '../components/form-components/FormPassword';
import FormSubmit from '../components/form-components/FromSubmit';

const Login = () => (
	<div className='Login wrapper'>
		<a className='Logo' href='#'>
			LOGO
		</a>
		<form action='POST' className='Form'>
			<FormEmail />
			<FormPassword />
			<FormSubmit value={'Iniciar sesión'} />
		</form>
		<FormNav path={'/registrar'} value={' Registrate aquí!'} />
	</div>
);

export default Login;
