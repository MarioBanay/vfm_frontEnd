import React, { Component } from 'react';
import AuthenticationService from './AuthenticationService.js'

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: 'in28minutes',
            password: '',
            hasLoginFailed: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    loginClicked() {
        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                this.props.history.push(`/dashboard/${this.state.username}`)
            }).catch(() => {
                this.setState({ hasLoginFailed: true })
            })
    }

    render() {
        return (
            <>
            <h1>Login</h1>
            <div className="container">
                <div>User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} /></div>
                <div>Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} /></div>
                <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
            </div>
            </>
        )
    }
}

export default Login