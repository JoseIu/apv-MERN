import { Link } from 'react-router-dom';

const Footer = () => (
	<footer className='Footer'>
		<div className='wrapper Footer-content'>
			<Link to={'/'} className='Header-logo' href=''>
				Logo
			</Link>
			<nav className='Header-nav'>
				<ul className='Header-ul'>
					<li className='Header-li'>
						<a className='Header-link' href='#'>
							Github
						</a>
					</li>
					<li className='Header-li'>
						<a className='Header-link' href='#'>
							Instagram
						</a>
					</li>
				</ul>
			</nav>
		</div>
	</footer>
);

export default Footer;
