import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthLayOut from './layout/AuthLayOut';

import { AuthProvider } from './context/AuthProvider';
import AdminHeader from './layout/AdminHeader';
import ConfirmAcc from './pages/ConfirmAcc';
import ForgetPass from './pages/ForgetPass';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPWD from './pages/ResetPWD';
import PatientAdministrator from './pages/private/PatientAdministrator';

const App = () => (
	<BrowserRouter>
		<AuthProvider>
			<Routes>
				<Route path='/' element={<AuthLayOut />}>
					<Route index element={<Login />} />
					<Route path='registrar' element={<Register />} />
					<Route path='olvide-password' element={<ForgetPass />} />
					<Route path='olvide-password/:token' element={<ResetPWD />} />

					<Route path='confirmar-cuenta/:token' element={<ConfirmAcc />} />
				</Route>
				<Route path='/admin' element={<AdminHeader />}>
					<Route path='perfil' index element={<PatientAdministrator />}></Route>
				</Route>
			</Routes>
		</AuthProvider>
	</BrowserRouter>
);

export default App;
