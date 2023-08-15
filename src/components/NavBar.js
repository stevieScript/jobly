import {NavLink} from 'react-router-dom';
import {Nav, Navbar, NavItem, NavbarBrand} from 'reactstrap';
import {useContext} from 'react';
import UserContext from '../auth/UserContext';

function NavBar({handleLogout}) {
	const {currentUser} = useContext(UserContext);

	function loggedInNav() {
		return (
			<Nav className='ml-auto' navbar>
				<NavItem className='mr-4'>
					<NavLink className='nav-link' to='/companies'>
						Companies
					</NavLink>
				</NavItem>
				<NavItem className='mr-4'>
					<NavLink className='nav-link' to='/jobs'>
						Jobs
					</NavLink>
				</NavItem>
				<NavItem className='mr-4'>
					<NavLink className='nav-link' to='/profile'>
						Profile
					</NavLink>
				</NavItem>
				<NavItem className='mr-4'>
					<NavLink className='nav-link' to='/' onClick={handleLogout}>
						Log Out {currentUser.first_name || currentUser.username}
					</NavLink>
				</NavItem>
			</Nav>
		);
	}

	function loggedOutNav() {
		return (
			<Nav className='ml-auto' navbar>
				<NavItem className='mr-4'>
					<NavLink className='nav-link' to='/login'>
						Login
					</NavLink>
				</NavItem>
				<NavItem className='mr-4'>
					<NavLink className='nav-link' to='/signup'>
						Sign Up
					</NavLink>
				</NavItem>
			</Nav>
		);
	}

	return (
		<div>
			<Navbar color='light' light expand='md'>
				<NavbarBrand href='/'>Jobly</NavbarBrand>
				{currentUser ? loggedInNav() : loggedOutNav()}
			</Navbar>
		</div>
	);
}

export default NavBar;

