import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {

    render() {
        return (
            <>
                <div>
                    Authenticated user is: {this.props.loggedInUsername}
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedInUsername: state.auth.authenticatedUsername,
    };
};

export default connect(mapStateToProps)(Dashboard);