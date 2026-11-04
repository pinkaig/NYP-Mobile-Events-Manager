import React, { Component } from "react";
import './addEvent.css'; // Import regular stylesheet

class addEvent extends Component {
    
    state = { 
        data: []
    }

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

            fetch('http://nypapp.eventsmgr/api/events',
            {
                method: 'POST',
                body: data,
            });
        }

    componentDidUpdate() {
        console.log("The component just updated!")
    }
    
    render() {
        return(
            <div>
                    <div id="registerEvent">
                          <h1>Add an event</h1>
                        <form onSubmit={this.handleSubmit} id="eventform">
                            <label>
                                <p>
                                    Event Title:&nbsp;
                            <input type="text"name="event_title" required/>
                                </p>
                                <p>
                                    Event Description:&nbsp;
                            <input type="text"name="event_desc" required/>
                                </p>
                                <p>
                                    Start Date:&nbsp;
                            <input type="date"name="startDate" required/>
                                </p>
                                <p>
                                    End Date:&nbsp;
                            <input type="date"name="endDate" required/>
                                </p>
                                <p>
                                    Start Time:&nbsp;
                            <input type="text"name="startTime" required/>
                                </p>
                                <p>
                                    End Time:&nbsp;
                            <input type="text"name="endTime" required/>
                                </p>
                                <p>
                                    Organiser:&nbsp;
                            <input type="text"name="organiser" required/>
                                </p>
                                <p>
                                    Venue:&nbsp;
                            <input type="text"name="venue" required/>
                                </p>
                                <p>
                                    User ID:&nbsp;
                                    <input type="text"name="u_id" required/>
                                </p>
                                <p>
                                    Category:&nbsp;
                                    <select name="c_id" form="eventform">
                                    <option value="1">Dance</option>
                                    <option value="2">Sports</option>
                                    <option value="3">Entertainment</option>
                                    <option value="4">Cultural</option>
                                    </select>
                                </p>
                               
                                <p>
                                    Photo:&nbsp;
                            <input type="file" name="photo" required/> 
                                </p>
                                <p>
                                    E-Mail:&nbsp;
                            <input type="text"name="organiser_email" required/>
                                </p>
                                <p>
                                    Status:&nbsp;
                                    <input type="text"name="status" required/>
                                </p>
                                <p>
                                    Closing Date:&nbsp;
                            <input type="date"name="closing_date" required/>
                                </p>
                            </label>
                            <input type="submit" value="Submit"/>
                        </form>
                    </div>
                
            </div>
        )
    }
    
}

export default addEvent;