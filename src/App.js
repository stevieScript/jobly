import AppRoutes from './AppRoutes';
import Navbar from './components/NavBar';
import { BrowserRouter } from 'react-router-dom';
import JoblyApi from './api';
import './App.css';

function App() {
	// const [token, setToken] = useState(null);
	// const [currentUser, setCurrentUser] = useState(null);
	// const [applications, setApplications] = useState(null);

	// useEffect(() => {
	// 	const token = localStorage.getItem('token');
	// 	const username = localStorage.getItem('username');
	// 	const applications = localStorage.getItem('applications');
	// 	if (token && username) {
	// 		setToken(token);
	// 		setCurrentUser(username);
	// 		setApplications(applications);
	// 	}
	// }, []);

	// const login = async (username, password) => {
	// 	const token = await JoblyApi.login(username, password);
	// 	localStorage.setItem('token', token);
	// 	localStorage.setItem('username', username);
	// 	setToken(token);
	// 	setCurrentUser(username);
	// };

	// const logout = () => {
	// 	localStorage.removeItem('token');
	// 	localStorage.removeItem('username');
	// 	setToken(null);
	// 	setCurrentUser(null);
	// };

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
