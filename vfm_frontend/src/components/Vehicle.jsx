import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'
import VehicleDataService from '../api/dataService/VehicleDataService.js';
import moment from 'moment'

class Vehicle extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            length: '',
            width: '',
            height: '',
            kerbWeight: '',
            maximumPowerOutput: '',
            maximumSpeed: '',
            cylinderCapacity: '',
            co2: '',
            numberOfDoors: '',
            make: '',
            model: '',
            type: '',
            bodyType: '',
            typeOfFuel: '',
            vin: '',
            colour: '',
            tyres: '',
            registeredKeeper: '',
            owner: '',
            registrationNumber: '',
            dateOfFirstRegistration: moment(new Date()).format('YYYY-MM-DD'),
            dateOfFirstRegistrationInCroatia: moment(new Date()).format('YYYY-MM-DD'),
            validThrough: moment(new Date()).format('YYYY-MM-DD'),
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {

        if (Number(this.state.id) === -1) {
            return
        }

        let username = AuthenticationService.getLoggedInUserName()

        VehicleDataService.retrieveVehicle(username, this.state.id)
            .then(response => {
                this.setState({
                    length: response.data.length,
                    width: response.data.width,
                    height: response.data.height,
                    kerbWeight: response.data.kerbWeight,
                    maximumPowerOutput: response.data.maximumPowerOutput,
                    maximumSpeed: response.data.maximumSpeed,
                    cylinderCapacity: response.data.cylinderCapacity,
                    co2: response.data.co2,
                    numberOfDoors: response.data.numberOfDoors,
                    make: response.data.make,
                    model: response.data.model,
                    type: response.data.type,
                    bodyType: response.data.bodyType,
                    typeOfFuel: response.data.typeOfFuel,
                    vin: response.data.vin,
                    colour: response.data.colour,
                    tyres: response.data.tyres,
                    registeredKeeper: response.data.registeredKeeper,
                    owner: response.data.owner,
                    registrationNumber: response.data.registrationNumber,
                    dateOfFirstRegistration: moment(response.data.dateOfFirstRegistration).format('YYYY-MM-DD'),
                    dateOfFirstRegistrationInCroatia: moment(response.data.dateOfFirstRegistrationInCroatia).format('YYYY-MM-DD'),
                    validThrough: moment(response.data.validThrough).format('YYYY-MM-DD'),
                })
            })
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    onSubmit(event) {

        event.preventDefault();
        let username = AuthenticationService.getLoggedInUserName()

        let vehicle = {
            id: this.state.id,
            length: event.target.length.value,
            width: event.target.width.value,
            height: event.target.height.value,
            kerbWeight: event.target.kerbWeight.value,
            maximumPowerOutput: event.target.maximumPowerOutput.value,
            maximumSpeed: event.target.maximumSpeed.value,
            cylinderCapacity: event.target.cylinderCapacity.value,
            co2: event.target.co2.value,
            numberOfDoors: event.target.numberOfDoors.value,
            make: event.target.make.value,
            model: event.target.model.value,
            type: event.target.type.value,
            bodyType: event.target.bodyType.value,
            typeOfFuel: event.target.typeOfFuel.value,
            vin: event.target.vin.value,
            colour: event.target.colour.value,
            tyres: event.target.tyres.value,
            registeredKeeper: event.target.registeredKeeper.value,
            owner: event.target.owner.value,
            registrationNumber: event.target.registrationNumber.value,
            dateOfFirstRegistration: moment(event.target.dateOfFirstRegistration.value).format('YYYY-MM-DD'),
            dateOfFirstRegistrationInCroatia: moment(event.target.dateOfFirstRegistrationInCroatia.value).format('YYYY-MM-DD'),
            validThrough: moment(event.target.validThrough.value).format('YYYY-MM-DD'),
        }

        if (Number(this.state.id) === -1) {

            VehicleDataService
                .createVehicle(username, vehicle)
                .then(() => {
                    this.props.history.push('/vehicles')
                })
        } else {
            VehicleDataService.updateVehicle(username, this.state.id, vehicle)
                .then((response) => {
                    this.props.history.push('/vehicles')
                })
        }
    }

    render() {
        return (
            <div>
                <h1>Vehicle</h1>
                <div className="container">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <input type="text" className="form-control" name="vin" placeholder="vin" value={this.state.vin} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <input type="text" className="form-control" name="make" placeholder="make" value={this.state.make} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-2">
                                <input type="text" className="form-control" name="model" placeholder="model" value={this.state.model} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-2">
                                <input type="text" className="form-control" name="type" placeholder="type" value={this.state.type} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-2">
                                <input type="text" className="form-control" name="bodyType" placeholder="body type" value={this.state.bodyType} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-2">
                                <input type="text" className="form-control" name="colour" placeholder="colour" value={this.state.colour} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-2">
                                <input type="text" className="form-control" name="numberOfDoors" placeholder="number of doors" value={this.state.numberOfDoors} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <input type="text" className="form-control" name="maximumPowerOutput" placeholder="maximum power output" value={this.state.maximumPowerOutput} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-2">
                                <input type="text" className="form-control" name="cylinderCapacity" placeholder="cylinder capacity" value={this.state.cylinderCapacity} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-2">
                                <input type="text" className="form-control" name="co2" placeholder="co2" value={this.state.co2} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-2">
                                <input type="text" className="form-control" name="maximumSpeed" placeholder="maximum speed" value={this.state.maximumSpeed} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-2">
                                <input type="text" className="form-control" name="typeOfFuel" placeholder="type of fuel" value={this.state.typeOfFuel} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <input type="text" className="form-control" name="length" placeholder="length" value={this.state.length} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-2">
                                <input type="text" className="form-control" name="width" placeholder="width" value={this.state.width} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-2">
                                <input type="text" className="form-control" name="height" placeholder="height" value={this.state.height} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-2">
                                <input type="text" className="form-control" name="kerbWeight" placeholder="kerb weight" value={this.state.kerbWeight} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-2">
                                <input type="text" className="form-control" name="tyres" placeholder="tyres" value={this.state.tyres} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <input type="text" className="form-control" name="registrationNumber" placeholder="pregistration numberhone" value={this.state.registrationNumber} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-2">
                                <input type="text" className="form-control" name="owner" placeholder="owner" value={this.state.owner} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-2">
                                <input type="text" className="form-control" name="registeredKeeper" placeholder="registered keeper" value={this.state.registeredKeeper} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <input type="date" className="form-control" name="dateOfFirstRegistration" placeholder="dateOfFirstRegistration" value={this.state.dateOfFirstRegistration} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-2">
                                <input type="date" className="form-control" name="dateOfFirstRegistrationInCroatia" placeholder="dateOfFirstRegistrationInCroatia" value={this.state.dateOfFirstRegistrationInCroatia} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-2">
                                <input type="date" className="form-control" name="validThrough" placeholder="expvalidThroughires" value={this.state.validThrough} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <button className="btn btn-primary" type="submit">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Vehicle