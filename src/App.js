import AppRoutes from './AppRoutes';
import Navbar from './components/NavBar';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Navbar />
				<AppRoutes />
			</BrowserRouter>
		</div>
	);
}

export default App;
