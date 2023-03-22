const FormEmail = ({ email, setEmail }) => (
	<div className='Form-email'>
		<label className='Form-label' htmlFor='email'>
			Correo
		</label>
		<input
			className='Form-input'
			type='email'
			name='email'
			placeholder='correo....'
			value={email}
			onChange={e => setEmail(e.target.value)}
		/>
	</div>
);

export default FormEmail;
