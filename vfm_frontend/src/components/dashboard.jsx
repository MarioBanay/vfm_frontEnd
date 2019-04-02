import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService.js';

class Dashboard extends Component {


    render(){
        let authUsername = AuthenticationService.getLoggedInUserName();

        return(
            <div>Authenticated user is: {authUsername}</div>
        );
    }
}

export default Dashboard;