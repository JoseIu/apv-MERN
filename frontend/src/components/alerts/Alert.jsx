const Alert = ({ alert, errorActive }) => {
	console.log(errorActive);
	const err = errorActive ? 'Error' : 'Success';
	const { msg } = alert;
	console.log(alert);
	return (
		<>
			<span className={err}>{msg}</span>
		</>
	);
};

export default Alert;
