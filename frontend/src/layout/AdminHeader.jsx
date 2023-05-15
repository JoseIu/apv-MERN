import { Outlet } from 'react-router-dom';

const AdminHeader = () => {
	return (
		<>
			<h1>Desde adminHeader PORTEGIDO!!!</h1>
			<Outlet />
		</>
	);
};

export default AdminHeader;
