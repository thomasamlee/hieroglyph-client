import React from 'react';

// Simple login page with OAuth button

export default function Login() {
	return (
		<div>
			<h1>Login Page</h1>
			<div>
				<input placeholder='username' />
				<input placeholder='password' />
				<button>Sign In</button>
				<button>Register</button>
				<button>Login with Google </button>
			</div>
		</div>
	);
}
