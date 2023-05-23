import { Link } from 'react-router-dom';
import AddIcont from '../../components/patients/AddIcon';

const PatientAdministrator = () => (
	<section className='wrapper Patients'>
		<div>
			<form className='Form FormLogin'>Formularo De Busqueda</form>
		</div>
		<div className='Patients-container'>
			<Link to='add-paciente'>
				<AddIcont className={'Patients-add'} />
			</Link>
			<ul className='Patients-list'>
				<li>Uno</li>
				<li>dos</li>
				<li>Tres</li>
				<li>Cuatro</li>
				<li>Cinco</li>
				<li>Seis</li>
				<li>Uno</li>
				<li>dos</li>
				<li>Tres</li>
				<li>Cuatro</li>
				<li>Cinco</li>
				<li>Seis</li>
				<li>Uno</li>
				<li>dos</li>
				<li>Tres</li>
				<li>Cuatro</li>
				<li>Cinco</li>
				<li>Seis</li>
				<li>Uno</li>
				<li>dos</li>
				<li>Tres</li>
				<li>Cuatro</li>
				<li>Cinco</li>
				<li>Seis</li>
				<li>Uno</li>
				<li>dos</li>
				<li>Tres</li>
				<li>Cuatro</li>
				<li>Cinco</li>
				<li>Seis</li>
				<li>Uno</li>
				<li>dos</li>
				<li>Tres</li>
				<li>Cuatro</li>
				<li>Cinco</li>
				<li>Seis</li>
				<li>Uno</li>
				<li>dos</li>
				<li>Tres</li>
				<li>Cuatro</li>
				<li>Cinco</li>
				<li>Seis</li>
			</ul>
		</div>
	</section>
);
export default PatientAdministrator;
