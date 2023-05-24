import RenderPatientRow from './RenderPatientRow';

const RenderPatientsList = ({ patients }) => {
	if (!patients.length < 0) return <p>No hay pacientess</p>;
	console.log(patients);

	return patients.map(patient => <RenderPatientRow key={patient._id} {...patient} />);
};

export default RenderPatientsList;
