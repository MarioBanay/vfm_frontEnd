import React, { Component } from 'react'
import DriverDataService from '../api/driver/DriverDataService'
import AuthenticationService from './AuthenticationService.js'

class Drivers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            drivers: [],
        }
        //this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        //this.updateTodoClicked = this.updateTodoClicked.bind(this)
        //this.addTodoClicked = this.addTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
    }

    componentDidMount() {
        this.refreshTodos();
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUserName()
        DriverDataService.retrieveAllDrivers(username)
            .then(
                response => {
                    console.log(response);
                    this.setState({ drivers: response.data })
                }
            )
    }

    // deleteTodoClicked(id) {
    //     let username = AuthenticationService.getLoggedInUserName()
    //     //console.log(id + " " + username);
    //     TodoDataService.deleteTodo(username, id)
    //         .then(
    //             response => {
    //                 this.setState({ message: `Delete of todo ${id} Successful` })
    //                 this.refreshTodos()
    //             }
    //         )

    // }

    // addTodoClicked() {
    //     this.props.history.push(`/todos/-1`)
    // }

    // updateTodoClicked(id) {
    //     this.props.history.push(`/todos/${id}`)
    // }

    render() {
        console.log('render')
        return (
            <div>
                <h1>Drivers</h1>
                <div className="container">
                    <div>
                        <button className="btn btn-success m-3" onClick={this.addTodoClicked}>Add driver</button>
                        <br />
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Last Name?</th>
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
                                            <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(driver.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(driver.id)}>Delete</button></td>
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