import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import users from "./users";
import events from "./events";
import addEvent from "./addEvent";
import editEvent from "./editEvent";
import "./Main.css";

class Main extends Component {
  
    render() {
      return (

        <HashRouter>
          <div>
          <header></header>
            <ul className="header">
            <li className="nav"><NavLink to="/">Home</NavLink></li>
            <li className="nav"><NavLink to="/events">Events</NavLink></li>
            <li className="nav"><NavLink to="/users">Users</NavLink></li>
            </ul>
            <div className="content">
            <Route path="/users" component={users}/>
            <Route path="/events" component={events}/>
            <Route path="/addEvent" component={addEvent}/>
            <Route path="/editEvent" component={editEvent}/>
            </div>
          </div>
        </HashRouter>
      );
    }
  }

  export default Main;