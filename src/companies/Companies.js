import React from 'react';
import {Navigate} from 'react-router-dom';
import CompanyCard from './CompanyDetail';
import UserContext from '../auth/UserContext';
// import JoblyApi from '../api';
// import './Companies.css';

function Companies({companies}) {
	const {currentUser} = React.useContext(UserContext);

	if (!currentUser) {
		return <Navigate to='/' />;
	}

	return (
		<div className='Companies'>
			{companies.map((company) => (
				<CompanyCard key={company.handle} company={company} />
			))}
		</div>
	);
}

export default Companies;

