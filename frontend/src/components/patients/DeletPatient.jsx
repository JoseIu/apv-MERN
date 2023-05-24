import DeleteIcon from './DeleteIcon';

const DeletePatient = paciente => (
	<button onClick={() => editPatient(paciente)}>
		<DeleteIcon />
	</button>
);
const editPatient = paciente => {
	console.log('Eliminando ' + paciente);
};
export default DeletePatient;
