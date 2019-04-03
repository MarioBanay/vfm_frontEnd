import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import { connect } from 'react-redux';

class HeaderComponent extends Component {

    render() {

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="https://github.com/MarioBanay" className="navbar-brand">VFMS</a></div>
                    <ul className="navbar-nav">
                    {this.props.isUserLoggedIn && <li><Link className="nav-link" to={`/dashboard/${this.props.authenticatedUsername}`}>Home</Link></li>}
                    {this.props.isUserLoggedIn && <li><Link className="nav-link" to={`/drivers/${this.props.authenticatedUsername}`}>Drivers</Link></li>}
                        
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!this.props.isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {this.props.isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        isUserLoggedIn: state.auth.isUserLoggedIn,
        authenticatedUsername: state.auth.authenticatedUsername,
    };
};

export default connect(mapStateToProps)(HeaderComponent);