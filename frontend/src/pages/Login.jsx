import FormEmail from '../components/form-components/FormEmail';
import FormNav from '../components/form-components/FormNav';
import FormPassword from '../components/form-components/FormPassword';
import FormSubmit from '../components/form-components/FromSubmit';

const Login = () => {
	return (
		<div className='Login wrapper'>
			<a className='Logo' href='#'>
				LOGO
			</a>
			<form action='POST' className='Form'>
				<FormEmail />
				<FormPassword />
				<FormSubmit value={'Iniciar sesión'} />
			</form>
			<FormNav
				path={'/registrar'}
				value={'¿No tienes cuenta?, registrate aquí!'}
				path2={'/olvide-password'}
				value2={'Olvide mi contraseña'}
			/>
		</div>
	);
};
export default Login;
