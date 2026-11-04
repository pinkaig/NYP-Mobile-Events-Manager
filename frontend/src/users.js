import React, { Component } from "react";
import './users.css'; // Import regular stylesheet


class users extends Component {
    
    state = { 
        data: [],
        loading: false
    }
    componentDidMount() {
        this.setState({loading: true})
            fetch('http://nypapp.eventsmgr/api/users')
            .then(data => data.json())
            .then(data => this.setState({data, loading: false}))
    }

    componentDidUpdate() {
        console.log("The component just updated!")
    }

    render() {
        return(
            <div>
                          <h1>User List</h1>
                {this.state.loading
                ? "loading..."
                : <div>
                        <table border="1" id="column">
                        <div>
                        <div id="column">
                            <th>User Id</th>
                        </div> 
                            {this.state.data.map(users=> {
                        return(
                            <div id="t_data">
                                <td>{users.user_id}</td>
                            </div>
                        )
                            })}
                        </div>
                        <div>
                            <div id="column">
                            <th>Username</th>
                            </div>
                            {this.state.data.map(users=> {
                        return(
                            <div id="t_data">
                                <td>{users.username}</td>
                            </div>
                        )
                            })}
                        </div>
                        <div>
                            <div id="column">
                            <th>Role</th>
                            </div>
                            {this.state.data.map(users=> {
                        return(
                            <div id="t_data">
                                <td>{users.role}</td>
                            </div>
                        )
                            })}
                        </div>
                        <div>
                            <div id="column">
                            <th>Phone Number</th>
                            </div>
                            {this.state.data.map(users=> {
                        return(
                            <div id="t_data">
                                <td>{users.phoneNo}</td>
                            </div>
                        )
                            })}
                        </div>    
                        </table>
                    </div>
                }
            </div>
        )
    }
}

export default users;