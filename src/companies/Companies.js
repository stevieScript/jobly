import React, {useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import CompanyCard from './CompanyDetail';
import JoblyApi from '../api';
import UserContext from '../auth/UserContext';

function Companies() {
	const {currentUser} = React.useContext(UserContext);
	const [companies, setCompanies] = useState([]);

	useEffect(() => {
		const getCompanies = async () => {
			const companies = await JoblyApi.getAllCompanies();
			setCompanies(companies);
		};
		getCompanies();
	}, []);

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

