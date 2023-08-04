import {Card, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import UserContext from '../auth/UserContext';
import {useParams} from 'react-router-dom';
import Jobs from '../jobs/Jobs';
import JoblyApi from '../api';
import {useContext, useState, useEffect} from 'react';

function JobDetail({job}) {
	const {currentUser, hasAppliedToJob, handleApply} = useContext(UserContext);
	const {handle} = useParams();
	const [company, setCompany] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		async function getCompany() {
			if (!handle) {
				setLoading(false);
				return;
			}
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

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!currentUser) {
		return <Navigate to='/' />;
	}

	return (
		<div className='JobDetail col-md-8 offset-md-2'>
			<Card className='JobCard'>
				<div className='card-body'>
					<h6 className='card-title d-flex justify-content-between'>
						<span className='text-capitalize'>{job.title}</span>
						<span>
							{hasAppliedToJob(job.id) ? (
								<Button color='danger' disabled>
									Applied
								</Button>
							) : (
								<Button
									className='btn btn-danger font-weight-bold'
									onClick={() => handleApply(job.id)}>
									Apply
								</Button>
							)}
						</span>
					</h6>
					<p>{job.salary}</p>
					<p>{job.equity}</p>
					<p>{job.companyHandle}</p>
				</div>
			</Card>
		</div>
	);
}

export default JobDetail;

