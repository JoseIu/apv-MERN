import { Navigate, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';

const AdminHeader = () => {
	const { auth, loadind } = useAuth();
	console.log(auth);
	console.log(loadind);

	if (loadind) return 'aaaa';
	return (
		<>
			<Header />
			{auth?._id ? <Outlet /> : <Navigate to='/' />}
			<Footer />
		</>
	);
};

export default AdminHeader;
