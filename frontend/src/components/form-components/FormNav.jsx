import { Link } from 'react-router-dom';

const FormNav = ({ path, value }) => (
	<nav className='Login-nav'>
		<Link to={path} className='Form-a'>
			{value}
		</Link>
		<Link to={'/olvide-password'} className='Form-a'>
			He olvidado mi contraseña
		</Link>
	</nav>
);

export default FormNav;
