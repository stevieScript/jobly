import {Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import CompanyList from './companies/CompanyList';
import CompanyDetail from './companies/CompanyDetail';
import JobList from './jobs/JobList';

function AppRoutes({handleLogin, handleSignup}) {
	return (
		<div className='App pt-5'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login handleLogin={handleLogin} />} />
				<Route path='/signup' element={<Signup handleSignup={handleSignup} />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/companies' element={<CompanyList />} />
				<Route path='/companies/:handle' element={<CompanyDetail />} />
				<Route path='/jobs' element={<JobList />} />
			</Routes>
		</div>
	);
}

export default AppRoutes;

