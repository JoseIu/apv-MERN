const Alert = ({ alert }) => {
	const { msg, errorActive } = alert;
	console.log(errorActive);
	const err = errorActive ? 'Error' : 'Success';
	return (
		<>
			<span className={err}>{msg}</span>
		</>
	);
};

export default Alert;
