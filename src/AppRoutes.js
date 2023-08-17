import {Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Companies from './companies/Companies';
import Company from './companies/Company';
import Jobs from './jobs/Jobs';

function AppRoutes({handleLogin, handleSignup}) {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login handleLogin={handleLogin} />} />
				<Route path='/signup' element={<Signup handleSignup={handleSignup} />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/companies' element={<Companies />} />
				<Route path='/companies/:handle' element={<Company />} />
				<Route path='/jobs' element={<Jobs />} />
			</Routes>
		</div>
	);
}

export default AppRoutes;

