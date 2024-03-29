import {useState, useEffect} from 'react';
import AppRoutes from './AppRoutes';
import Navbar from './components/NavBar';
import {BrowserRouter} from 'react-router-dom';
import JoblyApi from './api';
import UserContext from './auth/UserContext';
import jwt from 'jsonwebtoken';
import './App.css';

function App() {
	const [infoLoaded, setInfoLoaded] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [applicationIds, setApplicationIds] = useState(new Set([]));
	const [token, setToken] = useState(() => localStorage.getItem('token') || null);

	useEffect(() => {
		async function getCurrentUser() {
			if (token) {
				try {
					let {username} = jwt.decode(token);
					JoblyApi.token = token;
					let currentUser = await JoblyApi.getUser(username);
					setCurrentUser(currentUser);
					setApplicationIds(new Set(currentUser.applications));
				} catch (err) {
					console.error('App loadUserInfo: problem loading', err);
					setCurrentUser(null);
				}
			}
			setInfoLoaded(true);
		}
		setInfoLoaded(false);
		getCurrentUser(token);
	}, [token]);

	const handleLogin = async (loginData) => {
		try {
			let token = await JoblyApi.login(loginData);
			setToken(token);
			return {success: true};
		} catch (errors) {
			console.error('login failed', errors);
			return {success: false, errors};
		}
	};

	const handleSignup = async (signupData) => {
		try {
			let token = await JoblyApi.register(signupData);
			setToken(token);
			return {success: true};
		} catch (errors) {
			console.error('signup failed', errors);
			return {success: false, errors};
		}
	};

	const handleLogout = () => {
		setCurrentUser(null);
		setToken(null);
		localStorage.removeItem('token');
	};

	const handleUpdateProfile = async (username, profileData) => {
		try {
			let updatedUser = await JoblyApi.updateUser(username, profileData);
			setCurrentUser(updatedUser);
			return {success: true};
		} catch (errors) {
			console.error('update failed', errors);
			return {success: false, errors};
		}
	};

	const handleApply = async (id) => {
		if (hasAppliedToJob(id)) return;
		try {
			await JoblyApi.applyToJob(currentUser.username, id);
			setApplicationIds(new Set([...applicationIds, id]));
			return {success: true};
		} catch (errors) {
			console.error('apply failed', errors);
			return {success: false, errors};
		}
	};

	const hasAppliedToJob = (id) => {
		return applicationIds.has(id);
	};

	if (!infoLoaded) return <h1>Loading...</h1>;

	return (
		<div className='App'>
			<BrowserRouter>
				<UserContext.Provider
					value={{
						currentUser,
						setCurrentUser,
						hasAppliedToJob,
						handleApply,
						handleLogin,
						handleSignup,
						handleUpdateProfile,
					}}>
					<Navbar handleLogout={handleLogout} />
					<AppRoutes login={handleLogin} logout={handleLogout} />
				</UserContext.Provider>
			</BrowserRouter>
		</div>
	);
}

export default App;

