import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalcontext } from '../ContextAPI';

const Register = () => {
	const { server_url, setCredentials } = useGlobalcontext()
	const [UserName, setUserName] = useState('');
	const [Password, setPassword] = useState('');
	const [Err, setErr] = useState(null)
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(server_url)
		fetch(`${server_url}/users/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: UserName, password: Password })
		})
			.then(async (res) => {
				if (!res.ok) {
					const { msg } = await res.json();
					console.log('handleErrors-> msg: ', msg)
					setErr(msg)
					throw Error(msg);
				}
				return res.json();
			})
			.then((data) => {
				console.log("data: ", data);
				setCredentials(data.username)
				navigate('/');
			})
			.catch((err) => {
				console.log("err", err)

			})
	}

	return (<>
		<h1>Register</h1>
		<br />
		{
			!Err ?
				'' :
				<div style={{ color: 'red', margin: '6px' }}>{Err}</div>
		}
		<form action="" onSubmit={handleSubmit} style={{ padding: '5px' }}>
			<input type="username" placeholder='username' name='username'
				value={UserName} onChange={(e) => { setUserName(e.target.value) }} />
			<br /><br />
			<input type="password" placeholder='password' name='password'
				value={Password} onChange={(e) => { setPassword(e.target.value) }} />
			<br /><br />
			<button type='submit'>Submit</button>
		</form>
	</>)
}

export default Register;