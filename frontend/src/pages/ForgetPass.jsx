import FormEmail from '../components/form-components/FormEmail';
import FormNav from '../components/form-components/FormNav';
import FormSubmit from '../components/form-components/FromSubmit';

const ForgetPass = () => (
	<div className='Login wrapper'>
		<a className='Logo' href='#'>
			LOGO
		</a>
		<form action='POST' className='Form'>
			<FormEmail />
			<FormSubmit value={'Enviar email'} />
		</form>
		<FormNav
			path={'/'}
			value={'¿Tienes cuenta?, Inicia sesión!'}
			path2={'/registrar'}
			value2={'¿No tienes cuenta?, registrate!'}
		/>
	</div>
);

export default ForgetPass;
