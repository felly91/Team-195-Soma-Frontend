import React from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Footer from "./components/footer.component";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import About from "./components/about.component";
import Courses from "./components/courses.component";
import Home from "./components/home.component";


function App() {
  return (
    <Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>Soma</Link>
         
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to={"/about"}>About Soma</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/courses"}>Courses</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="main">
        <div className="page">
          <Switch>
          <Route exact path='/' component={Home} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/about" component={About} />
            <Route path="/courses" component={Courses} />
          </Switch>
        </div>
      </div>
      {/* <Hero/> */}
      <Footer/>
    </div></Router>
  );
}

export default App;