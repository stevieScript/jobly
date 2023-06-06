import React from 'react';
import CompanyCard from './CompanyCard';
// import './Companies.css';

function Companies({ companies }) {
	return (
		<div className='Companies'>
			{companies.map((company) => (
				<CompanyCard
					key={company.handle}
					company={company}
				/>
			))}
		</div>
	);
}

export default Companies;
