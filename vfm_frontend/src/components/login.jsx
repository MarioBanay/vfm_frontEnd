import React, { Component } from 'react';
import AuthenticationService from './AuthenticationService.js'
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
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

                this.props.onAuthenticate(this.state.username)
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                this.props.history.push(`/dashboard/${this.state.username}`)

            }).catch(() => {
                this.setState({ username: '' })
                this.setState({ password: '' })
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

const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: (username) => dispatch({ type: actionTypes.AUTHENTICATE_USER, username: username }),
    };
};

export default connect(null, mapDispatchToProps)(Login);