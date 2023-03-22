import { Link } from 'react-router-dom';

const FormNav = ({ path, value, path2, value2 }) => (
	<nav className='Login-nav'>
		<Link to={path} className='Form-a'>
			{value}
		</Link>
		<Link to={path2} className='Form-a'>
			{value2}
		</Link>
	</nav>
);

export default FormNav;
