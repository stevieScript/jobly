import React, {useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import CompanyCard from './CompanyCard';
import JoblyApi from '../api';
import SearchForm from '../SearchForm';
import UserContext from '../auth/UserContext';
// import './Company.css';

function CompanyList() {
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
		<div className='CompanyList col-md-8 offset-md-2'>
			<SearchForm search={search} />
			{companies.length ? (
				<div className='CompanyList-list'>
					{companies.map((company) => (
						<CompanyCard key={company.handle} company={company} />
					))}
				</div>
			) : (
				<p className='lead'>Sorry, no results were found!</p>
			)}
		</div>
	);
}

export default CompanyList;

