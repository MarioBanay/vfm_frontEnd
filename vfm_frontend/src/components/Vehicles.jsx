import React, { Component } from 'react'
import VehicleDataService from '../api/dataService/VehicleDataService'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

class Vehicles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            vehicles: [],
            message: null
        }
        this.deleteVehiclerClicked = this.deleteVehiclerClicked.bind(this)
        this.updateVehiclelicked = this.updateVehiclelicked.bind(this)
        this.addVehicleClicked = this.addVehicleClicked.bind(this)
        this.refreshVehicles = this.refreshVehicles.bind(this)
    }

    componentDidMount() {
        this.refreshVehicles();
    }

    refreshVehicles() {
        let username = AuthenticationService.getLoggedInUserName()
        VehicleDataService.retrieveAllVehicles(username)
            .then(
                response => {
                    this.setState({ vehicles: response.data })

                }
            )
    }

    deleteVehiclerClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        VehicleDataService.deleteVehicle(username, id)
            .then(
                response => {
                    this.setState({ message: `Delete of vehicle ${id} Successful` })
                    this.refreshVehicles()
                }
            )

    }

    addVehicleClicked() {
        this.props.history.push(`/vehicles/-1`)
    }

    updateVehiclelicked(id) {
        this.props.history.push(`/vehicles/${id}`)
    }

    render() {
        return (
            <div>
                <h1>Vehicles</h1>
                <div className="container">
                    <div>
                        <button className="btn btn-success m-3" onClick={this.addVehicleClicked}>Add vehicle</button>
                        <br />
                    </div>
                    {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Registration number</th>
                                <th>Registration valid through</th>
                                <th>Make</th>
                                <th>Model</th>
                                <th></th>
                                <th></th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.vehicles.map(
                                    vehicle =>
                                        <tr key={vehicle.id}>
                                            <td>{vehicle.registrationNumber}</td>
                                            <td>{moment(vehicle.validThrough).format('DD.MM.YYYY')}</td>
                                            <td>{vehicle.make}</td>
                                            <td>{vehicle.model}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateVehiclelicked(vehicle.id)}>Edit</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteVehiclerClicked(vehicle.id)}>Delete</button></td>
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

export default Vehicles