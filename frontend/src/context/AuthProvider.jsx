import { createContext, useEffect, useState } from 'react';
import conectDB from '../helpers/ConectDB';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({});
	const [loadind, setLoading] = useState(true);

	useEffect(() => {
		authUserValidator(setAuth, setLoading);
	}, []);

	return <AuthContext.Provider value={{ auth, setAuth, loadind }}>{children}</AuthContext.Provider>;
};
// validamos si esta autenticado
const authUserValidator = async (setAuth, setLoading) => {
	const authToken = localStorage.getItem('token');
	if (!authToken) {
		setLoading(false);
		return;
	}

	try {
		const data = await conectDB('veterinarios/perfil', 'GET', null, authToken);
		setAuth(data);
	} catch (error) {
		console.log(error);
	}
	setLoading(false);
};
export { AuthProvider };
export default AuthContext;
