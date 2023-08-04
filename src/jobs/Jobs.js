import React from 'react';
import JobDetail from './JobDetail';
import UserContext from '../auth/UserContext';
import {Navigate} from 'react-router-dom';
function Jobs({jobs}) {
	const {currentUser} = React.useContext(UserContext);

	if (!currentUser) {
		return <Navigate to='/' />;
	}

	return (
		<div className='Jobs'>
			{jobs.map((job) => (
				<JobDetail key={job.id} job={job} />
			))}
		</div>
	);
}

export default Jobs;

