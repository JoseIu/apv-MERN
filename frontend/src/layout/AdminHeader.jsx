import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminHeader = () => {
	const { auth, loadind } = useAuth();
	console.log(auth);
	console.log(loadind);

	if (loadind) return 'aaaa';
	return (
		<>
			<h1>Desde adminHeader PORTEGIDO!!!</h1>
			{auth?._id ? <Outlet /> : <Navigate to='/' />}
		</>
	);
};

export default AdminHeader;
