const Alert = ({ alert }) => {
	const { msg, errorActive } = alert;
	const err = errorActive ? 'Error' : 'Success';
	return (
		<>
			<span className={err}>{msg}</span>
		</>
	);
};

export default Alert;
