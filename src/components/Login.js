import React from 'react';
import { Form, Label, Input } from 'reactstrap';

function Login() {
	return (
		<div className='Login'>
			<h1>Login</h1>
			<Form>
				<Label htmlFor='username'>Username</Label>
				<Input
					type='text'
					name='username'
					id='username'
				/>
				<Label htmlFor='password'>Password</Label>
				<Input
					type='password'
					name='password'
					id='password'
				/>
			</Form>
		</div>
	);
}

export default Login;
