import React, { Component } from 'react'
import DriverDataService from '../api/dataService/DriverDataService.js'
import AuthenticationService from './AuthenticationService.js'

class Drivers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            drivers: [],
            message: null
        }
        this.deleteDriverClicked = this.deleteDriverClicked.bind(this)
        this.updateDriverlicked = this.updateDriverClicked.bind(this)
        this.addDriverClicked = this.addDriverClicked.bind(this)
        this.refreshDrivers = this.refreshDrivers.bind(this)
    }

    componentDidMount() {
        this.refreshDrivers();
    }

    refreshDrivers() {
        let username = AuthenticationService.getLoggedInUserName()
        DriverDataService.retrieveAllDrivers(username)
            .then(
                response => {
                    this.setState({ drivers: response.data })
                }
            )
    }

    deleteDriverClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        //console.log(id + " " + username);
        DriverDataService.deleteDriver(username, id)
            .then(
                response => {
                    this.setState({ message: `Delete of driver ${id} Successful` })
                    this.refreshDrivers()
                }
            )

    }

    addDriverClicked() {
        this.props.history.push(`/drivers/-1`)
    }

    updateDriverClicked(id) {
        this.props.history.push(`/drivers/${id}`)
    }

    render() {
        return (
            <div>
                <h1>Drivers</h1>
                <div className="container">
                    <div>
                        <button className="btn btn-success m-3" onClick={this.addDriverClicked}>Add driver</button>
                        <br />
                    </div>
                    {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th></th>
                                <th></th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.drivers.map(
                                    driver =>
                                        <tr key={driver.id}>
                                            <td>{driver.name}</td>
                                            <td>{driver.lastName}</td>
                                            <td>{driver.email}</td>
                                            <td>{driver.phone}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateDriverClicked(driver.id)}>Edit</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteDriverClicked(driver.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Drivers