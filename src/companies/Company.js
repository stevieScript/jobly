import {Card} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import UserContext from '../auth/UserContext';
import {useParams} from 'react-router-dom';
import Jobs from '../jobs/Jobs';
import JoblyApi from '../api';
import {useContext, useState, useEffect} from 'react';

function Company({jobs}) {
	const {currentUser, hasAppliedToJob} = useContext(UserContext);
	const {handle} = useParams();
	const [company, setCompany] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getCompany() {
			try {
				const companyData = await JoblyApi.getCompany(handle);
				setCompany(companyData);
			} catch (err) {
				// Handle the error as needed
				console.error(err);
			}
			setLoading(false);
		}

		getCompany();
	}, [handle]);

	let companyJobs = jobs.filter((job) => job.companyHandle === handle);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!currentUser) {
		return <Navigate to='/' />;
	}

	return (
		<Card className='Company'>
			<Link to={`/companies/${company.handle}`}>
				<h3>{company.name}</h3>
				<p>{company.description}</p>
			</Link>
			<Jobs jobs={companyJobs} />
		</Card>
	);
}

export default Company;

