import {Card, CardLink, CardBody, CardText} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import UserContext from '../auth/UserContext';
import {useContext} from 'react';
// import './CompanyCard.css';

function CompanyCard({company}) {
	const {currentUser} = useContext(UserContext);

	if (!currentUser) {
		return <Navigate to='/' />;
	}

	return (
		<div className='CompanyCard'>
			<Card
				// align this card in the center of the page
				className='mx-auto'
				style={{
					width: '60vw',
					margin: '.5rem',
					padding: '.5rem',
					border: '1px solid black',
					borderRadius: '5px',
				}}>
				<CardBody>
					<CardLink tag={Link} to={`/companies/${company.handle}`}>
						{company.name}
					</CardLink>
					<CardText>{company.description}</CardText>
				</CardBody>
			</Card>
		</div>
	);
}

export default CompanyCard;

