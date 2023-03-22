const FormPassword = ({ password, setPassword }) => (
	<div className='Form-password'>
		<label className='Form-label' htmlFor='password'>
			Contraseña
		</label>
		<input
			className='Form-input'
			type='password'
			name='password'
			placeholder='contraseña....'
			value={password}
			onChange={e => setPassword(e.target.value)}
		/>
	</div>
);

export default FormPassword;
