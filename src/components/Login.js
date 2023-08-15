import React from 'react';
import {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import UserContext from '../auth/UserContext';
import {Form, Label, Input, Button, Alert, FormGroup} from 'reactstrap';

function Login() {
	const navigate = useNavigate();
	const {handleLogin} = useContext(UserContext);
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});
	const [formErrors, setFormErrors] = useState([]);

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		let result = await handleLogin(formData);
		if (result.success) {
			navigate('/companies');
		} else {
			setFormErrors(result.errors);
		}
	};

	const handleChange = (evt) => {
		const {name, value} = evt.target;
		setFormData((formData) => ({
			...formData,
			[name]: value,
		}));
	};

	return (
		<div className='Login'>
			<div className='container col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
				<h2 className='mb-3'>Log In</h2>
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Label for='username'>Username</Label>
						<Input
							id='username'
							type='text'
							name='username'
							value={formData.username}
							onChange={handleChange}
							autoComplete='username'
							required
						/>
					</FormGroup>
					<FormGroup>
						<Label for='password'>Password</Label>
						<Input
							id='password'
							type='password'
							name='password'
							value={formData.password}
							onChange={handleChange}
							autoComplete='current-password'
							required
						/>
					</FormGroup>
					{formErrors.length ? (
						<Alert color='danger'>
							{formErrors.map((error) => (
								<div key={error}>{error}</div>
							))}
						</Alert>
					) : null}
					<Button color='primary'>Submit</Button>
				</Form>
			</div>
		</div>
	);
}

export default Login;

