import FormEmail from '../../components/form-components/FormEmail';
import ForName from '../../components/form-components/FormName';
import FormSubmit from '../../components/form-components/FromSubmit';

const FormAddPatient = () => (
	// Nombre mascota
	// Nombre dueño
	// Email dueño
	// Fecha alta
	// Síntomas
	<section className='Patients-form'>
		<form className='Form'>
			<ForName label={'Nombre mascota'} name={'name'} setName={'setName'} />
			<ForName label={'Nombre Dueño'} name={'name'} setName={'setName'} />
			<FormEmail email={'email'} setEmail={'setEmail'} />
			<div className='Form-date'>
				<label className='Form-label' htmlFor='date'>
					Fecha alta
				</label>
				<input
					className='Form-input'
					type='date'
					name='date'
					placeholder='nombre...'
					value={'date'}
					onChange={e => 'setDate'(e.target.value)}
				/>
			</div>
			<ForName label={'Síntomas'} name={'name'} setName={'setName'} />
			<div className='Form-email'>
				<label className='Form-label' htmlFor='symptoms'>
					Síntomas
				</label>
				<textarea className='Form-input' type='tex-area' name='symptoms' />
			</div>

			<FormSubmit value={'Agregar Paciente'} />
		</form>
	</section>
);

export default FormAddPatient;
