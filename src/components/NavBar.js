import { NavLink } from 'react-router-dom';

function NavBar() {
	return (
		<nav>
			<NavLink to='/'>Home</NavLink>
			<NavLink to='/companies'>Companies</NavLink>
			<NavLink to='/jobs'>Jobs</NavLink>
			{/* {localStorage.getItem('token') ? <NavLink to='/profile'>Profile</NavLink> : null} */}
			<NavLink to='/login'>Login</NavLink>
		</nav>
	);
}

export default NavBar;
