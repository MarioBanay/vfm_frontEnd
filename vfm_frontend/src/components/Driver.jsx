import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'
import DriverDataService from '../api/dataService/DriverDataService.js';
import moment from 'moment'

class Driver extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            lastName: '',
            oib: '',
            dateOfBirth: moment(new Date()).format('YYYY-MM-DD'),
            address: '',
            city: '',
            postalCode: '',
            email: '',
            phone: '',
            identityCardNumber: '',
            issued: moment(new Date()).format('YYYY-MM-DD'),
            expires: moment(new Date()).format('YYYY-MM-DD'),
            username: '',
            password: '',
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)


    }

    componentDidMount() {

        if (Number(this.state.id) === -1) {
            return
        }

        let username = AuthenticationService.getLoggedInUserName()

        DriverDataService.retrieveDriver(username, this.state.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    lastName: response.data.lastName,
                    oib: response.data.oib,
                    dateOfBirth: moment(response.data.dateOfBirth).format('YYYY-MM-DD'),
                    address: response.data.address,
                    city: response.data.city,
                    postalCode: response.data.postalCode,
                    email: response.data.email,
                    phone: response.data.phone,
                    identityCardNumber: response.data.identityCardNumber,
                    issued: moment(response.data.issued).format('YYYY-MM-DD'),
                    expires: moment(response.data.expires).format('YYYY-MM-DD'),
                    username: response.data.username,
                    password: response.data.password,
                })
            })
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    onSubmit(event) {
        event.preventDefault();
        let username = AuthenticationService.getLoggedInUserName()

        let driver = {
            id: this.state.id,
            name: event.target.name.value,
            lastName: event.target.lastName.value,
            oib: event.target.oib.value,
            dateOfBirth: event.target.dateOfBirth.value,
            address: event.target.address.value,
            city: event.target.city.value,
            postalCode: event.target.postalCode.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
            identityCardNumber: event.target.identityCardNumber.value,
            issued: event.target.issued.value,
            expires: event.target.expires.value,
            username: event.target.username.value,
            password: event.target.password.value,
        }

        if (Number(this.state.id) === -1) {

            DriverDataService
                .createDriver(username, driver)
                .then(() => {
                    this.props.history.push('/drivers')

                }
                )
        } else {
            DriverDataService.updateDriver(username, this.state.id, driver)
                .then((response) => {
                    this.props.history.push('/drivers')
                })
        }
    }

    render() {
        return (
            <div>
                <h1>Driver</h1>
                <div className="container">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-3">
                                <input type="text" className="form-control" name="name" placeholder="name" value={this.state.name} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-3">
                                <input type="text" className="form-control" name="lastName" placeholder="last name" value={this.state.lastName} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-3">
                                <input type="text" className="form-control" name="oib" placeholder="oib" value={this.state.oib} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-3">
                                <input type="date" data-date-format="YYYY-MM-DD" className="form-control" name="dateOfBirth" placeholder="date of birth" value={this.state.dateOfBirth} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" name="address" placeholder="address" value={this.state.address} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" name="city" placeholder="city" value={this.state.city} onChange={this.handleChange} />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <input type="text" className="form-control" name="postalCode" placeholder="postal code" value={this.state.postalCode} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-6">
                                <input type="text" className="form-control" name="email" placeholder="email" value={this.state.email} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <input type="text" className="form-control" name="phone" placeholder="phone" value={this.state.phone} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-6">
                                <input type="text" className="form-control" name="identityCardNumber" placeholder="identity card number" value={this.state.identityCardNumber} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <input type="date" className="form-control" name="issued" placeholder="issued" value={this.state.issued} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-6">
                                <input type="date" className="form-control" name="expires" placeholder="expires" value={this.state.expires} onChange={this.handleChange} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <input type="text" className="form-control" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-6">
                                <input type="password" className="form-control" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
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

export default Driver