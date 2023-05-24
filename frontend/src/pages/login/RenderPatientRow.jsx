const RenderPatientRow = ({ date, email, name, owner, symptoms }) => {
	return (
		<li className='Patients-row'>
			<div className='Patients-name'>{name}</div>
			<div className='Patients-owner'>{owner}</div>
			<div className='Patients-email'>{email}</div>
			<div className='Patients-date'>{date}</div>
			<div className='Patients-symptoms'>{symptoms}</div>
			<div className='Patients-actions'>
				<button>Editar</button>
				<button>Eliminar</button>
			</div>
		</li>
	);
};

export default RenderPatientRow;
