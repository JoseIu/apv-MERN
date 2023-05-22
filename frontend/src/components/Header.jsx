import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Header = () => {
	const { closeSession } = useAuth();
	return (
		<header className='Header'>
			<div className='wrapper Header-content'>
				<Link to='/' className='Header-logo' href=''>
					Logo
				</Link>
				<nav className='Header-nav'>
					<ul className='Header-ul'>
						<li className='Header-li'>
							<Link to='/admin' className='Header-link' href='#'>
								Pacientes
							</Link>
						</li>
						<li className='Header-li'>
							<Link to='/admin' className='Header-link' href='#'>
								Perfil
							</Link>
						</li>
						<li className='Header-li'>
							<button to='/admin' className='Header-link' href='#' onClick={closeSession}>
								Cerrar Sesión
							</button>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
