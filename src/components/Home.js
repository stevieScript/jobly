import {Button} from 'reactstrap';
import {Navigate} from 'react-router-dom';
import UserContext from '../auth/UserContext';
import {useContext} from 'react';

function Home() {
	const {currentUser} = useContext(UserContext);
	if (currentUser) {
		return <Navigate to='/companies' />;
	}
	return (
		<div className='Home'>
			<h1>Jobly</h1>
			<p>All the jobs in one, convenient place.</p>
			<Button href='/login'>Login</Button>
			<Button href='/signup'>Sign Up</Button>
		</div>
	);
}

export default Home;

