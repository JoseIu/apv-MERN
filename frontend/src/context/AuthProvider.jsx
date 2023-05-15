import { createContext, useEffect, useState } from 'react';
import conectDB from '../helpers/ConectDB';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({});

	useEffect(() => {
		authUserValidator(setAuth);
	}, []);

	return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};
// validamos si esta autenticado
const authUserValidator = async setAuth => {
	const authToken = localStorage.getItem('token');
	if (!authToken) return;

	try {
		const data = await conectDB('veterinarios/perfil', 'GET', null, authToken);
		console.log(data);
		setAuth(data);
	} catch (error) {
		console.log(error);
	}
};
export { AuthProvider };
export default AuthContext;
