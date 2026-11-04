import React, { Component } from "react";
import {
    NavLink,
    HashRouter
  } from "react-router-dom";
import './events.css'; // Import regular stylesheet
import ImageLoader from 'react-load-image';
    
class events extends Component {
    
    state = { 
        data: [],
        loading: false
    }
    componentDidMount() {
        this.setState({loading: true})
            fetch('http://nypapp.eventsmgr/api/events')
            .then(data => data.json())
            .then(data => this.setState({data, loading: false}))
    }

    componentDidUpdate() {
        console.log("The component just updated!")
    }

    render() {
        return(
            <div>
                          <h1>Event List</h1>
                {this.state.loading
                ? "loading..."
                : <div>
                        <table border="1" id="column">
                        <div>
                        <div id="column">
                        </div> 
                            {this.state.data.map(events=> {
                                  return(<ImageLoader
                                  src={events.photo}
                                ></ImageLoader>);
                            })}
                        </div>
                        <div>
                        <div class="column">
                            <th>Event Id</th>
                        </div> 
                            {this.state.data.map(events=> {
                        return(
                            <div id="t_data">
                                <td>{events.event_id}</td>
                            </div>
                        )
                            })}
                        </div>
                        <div>
                            <div class="column">
                            <th>Event Title</th>
                            </div>
                            {this.state.data.map(events=> {
                        return(
                            <div id="t_data">
                                <td>{events.event_title}</td>
                            </div>
                        )
                            })}
                        </div>
                        <div>
                            <div class="column">
                            <th>Start Date</th>
                            </div>
                            {this.state.data.map(events=> {
                        return(
                            <div id="t_data">
                                <td>{events.startDate}</td>
                            </div>
                        )
                        
                            })}
                            </div>
                            <div>
                            <div class="column">
                            <th>End Date</th>
                            </div>
                            {this.state.data.map(events=> {
                        return(
                            <div id="t_data">
                                <td>{events.endDate}</td>
                            </div>
                        )
                        
                            })}
                        </div>
                        <div>
                            <div class="column">
                            <th>Venue</th>
                            </div>
                            {this.state.data.map(events=> {
                        return(
                            <div id="t_data">
                                <td>{events.venue}</td>
                            </div>
                        )
                            })}
                        </div>  
                        <div>
                            <div class="column">
                            <th>Organiser</th>
                            </div>
                            {this.state.data.map(events=> {
                        return(
                            <div id="t_data">
                                <td>{events.organiser}</td>
                            </div>
                        )
                            })}
                        </div>        
                        </table>
                        <HashRouter>
          <div>
            <ul class="flex">
            <li id="Event"><NavLink id="tdn" to="/addEvent">Create an Event</NavLink></li>
                &nbsp;&nbsp;&nbsp;&nbsp;
            <li id="Event"><NavLink id="tdn" to="/editEvent">Edit</NavLink></li>
            </ul>
          </div>
        </HashRouter>
                    </div>
                }
            </div>
        )
    }
}

export default events;