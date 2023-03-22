import { Link } from 'react-router-dom';

const Login = () => (
	<div className='Login wrapper'>
		<a className='Logo' href='#'>
			LOGO
		</a>
		<form action='POST' className='Form'>
			<div className='From-email'>
				<label className='Form-label' htmlFor='email'>
					Correo
				</label>
				<input className='Form-input' type='email' name='email' placeholder='correo....' />
			</div>
			<div className='From-password'>
				<label className='Form-label' htmlFor='password'>
					Contraseña
				</label>
				<input className='Form-input' type='password' name='password' placeholder='contraseña....' />
			</div>
			<input className='Form-submit' type='submit' value='Iniciar sesión' />
		</form>
		<nav className='Login-nav'>
			<Link to={'/registrar'} className='Form-a' href='#'>
				¿No tienes cuenta?, Regístrate
			</Link>
			<Link to={'/olvide-password'} className='Form-a' href='#'>
				He olvidado mi contraseña
			</Link>
		</nav>
	</div>
);

export default Login;
