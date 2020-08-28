import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import authService from '../../services/authService';
import userService from '../../services/userService';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			password: '',
			roles: '',
			redirect: null,
		};
		this.loginUser = this.loginUser.bind(this);
		this.loginAdmin = this.loginAdmin.bind(this);
	}
	async fetchData() {
		const { data } = await userService.get();
		return this.setState({
			roles: data.roles

		});
	}
	loginUser(e) {
		const obj = {
			userName: this.state.userName,
			password: this.state.password,
		};
		authService
			.signIn(obj)
			.then((res) => {
				cookies.set('jwt-token', res.data, { path: '/' });
			})

		this.fetchData()
		if (this.state.roles == "ROLE_USER") {
			this.setState({ redirect: '/booking' })
			this.setState({ roles: '' })
			console.log(this.state.roles)
		} else {
			alert("Access denied")
			console.log(this.state.roles)

		}
	}
	loginAdmin(e) {
		const obj = {
			userName: this.state.userName,
			password: this.state.password,
		};
		authService
			.signIn(obj)
			.then((res) => {
				cookies.set('jwt-token', res.data, { path: '/' });
			})

		this.fetchData()

		console.log(this.state.roles)

		if (this.state.roles == "ROLE_ADMIN") {
			this.setState({ redirect: '/adminpage' })
			this.setState({ roles: '' })
			console.log(this.state.roles)
		} else {
			alert("Access denied")
			console.log(this.state.roles)

		}
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />;
		}
		return (
			<div className="base-container" ref={this.props.containerRef}>
				<div className="header">Login</div>
				<div className="content">
					<div className="form">
						<div className="form-group">
							<label>UserName:</label>
							<input
								onChange={(e) => this.setState({ userName: e.target.value })}
								value={this.state.userName}
								type="text"
								name="userName"
								id="userName"
							/>
						</div>
						<div className="form-group">
							<label>Password:</label>
							<input
								onChange={(e) => this.setState({ password: e.target.value })}
								value={this.state.password}
								type="password"
								name="password"
								id="password"
							/>
						</div>
					</div>
				</div>
				<div className="footer">

					<button
						onClick={this.loginUser}
						type="submit"
						className="btn btn-large btn-block btn-success"
					>
						Login as user
          </button>
				</div>
				<div className="footer">

					<button
						onClick={this.loginAdmin}
						type="submit"
						className="btn btn-large btn-block btn-success"
					>
						Login as admin
          </button>
				</div>
			</div>
		);
	}
}

export default Login;
