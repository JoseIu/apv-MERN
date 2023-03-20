import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthLayOut from './layout/AuthLayOut';

const App = () => (
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<AuthLayOut />}></Route>
		</Routes>
	</BrowserRouter>
);

export default App;
