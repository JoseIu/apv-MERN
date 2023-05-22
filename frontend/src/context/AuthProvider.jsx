import { createContext, useEffect, useState } from 'react';
import conectDB from '../helpers/ConectDB';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [loadindLogin, setLoadingLogin] = useState(true);
	const [auth, setAuth] = useState({});

	useEffect(() => {
		// userAuthorized(setAuth, setLoadingLogin);
		const userAuthorized = async () => {
			const authToken = localStorage.getItem('token');
			// console.log(authToken);
			if (!authToken) return setLoadingLogin(false);

			try {
				const data = await conectDB('veterinarios/perfil', 'GET', null, authToken);
				console.log(data);
				setAuth(data);
			} catch (error) {
				console.log(error);
			}
			setLoadingLogin(false);
		};
		userAuthorized();
	}, []);
	const closeSession = () => {
		localStorage.removeItem('token');
		setAuth({});
	};

	return (
		<AuthContext.Provider value={{ auth, setAuth, loadindLogin, closeSession }}>{children}</AuthContext.Provider>
	);
};
// validamos si esta autenticado
// const userAuthorized = async (setAuth, setLoadingLogin) => {
// 	const authToken = localStorage.getItem('token');
// 	console.log(authToken);
// 	if (!authToken) return setLoadingLogin(false);

// 	try {
// 		const data = await conectDB('veterinarios/perfil', 'GET', null, authToken);
// 		console.log(data);
// 		setAuth(data);
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	setLoadingLogin(false);
// };

export { AuthProvider };
export default AuthContext;
