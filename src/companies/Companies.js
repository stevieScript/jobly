import React, {useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import CompanyCard from './CompanyDetail';
import JoblyApi from '../api';
import SearchForm from '../SearchForm';
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

	const search = async (searchTerm) => {
		const companies = await JoblyApi.getCompanies(searchTerm);
		setCompanies(companies);
	};

	return (
		<div className='Companies'>
			<SearchForm search={search} />
			{companies.length === 0 && <h3>No results found</h3>}
			{companies.map((company) => (
				<CompanyCard key={company.handle} company={company} />
			))}
		</div>
	);
}

export default Companies;

