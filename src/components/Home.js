import {Navigate, Link} from 'react-router-dom';
import UserContext from '../auth/UserContext';
import {useContext} from 'react';
import './Home.css';

function Home() {
	const {currentUser} = useContext(UserContext);
	if (currentUser) {
		return <Navigate to='/companies' />;
	}
	return (
		<div className='Homepage'>
			<div className='container text-center'>
				<h1 className='mb-4 font-weight-bold'>Jobly</h1>
				<p className='lead'>All the jobs in one, convenient place.</p>
				{currentUser ? (
					<h2>Welcome Back, {currentUser.firstName || currentUser.username}!</h2>
				) : (
					<p>
						<Link className='btn btn-primary font-weight-bold mr-3' to='/login'>
							Log in
						</Link>
						<Link className='btn btn-primary font-weight-bold' to='/signup'>
							Sign up
						</Link>
					</p>
				)}
			</div>
		</div>
	);
}

export default Home;

