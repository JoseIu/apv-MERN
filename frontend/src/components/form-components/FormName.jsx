const ForName = ({ label, name, setName }) => (
	<div className='Form-email'>
		<label className='Form-label' htmlFor='name'>
			{label}
		</label>
		<input
			className='Form-input'
			type='text'
			name='name'
			placeholder='nombree....'
			value={name}
			onChange={e => setName(e.target.value)}
		/>
	</div>
);

export default ForName;
