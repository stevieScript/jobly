import { CompanyCard } from './CompanyCard';

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
