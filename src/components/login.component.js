// import React, { useState } from "react";
// import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
// import "./Login.css";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   function validateForm() {
//     return email.length > 0 && password.length > 0;
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//   }

//   return (
//     <div className="Login">
//       <form onSubmit={handleSubmit}>
//         <FormGroup controlId="email" bsSize="large">
//           <ControlLabel>Email</ControlLabel>
//           <FormControl
//             autoFocus
//             type="email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//           />
//         </FormGroup>
//         <FormGroup controlId="password" bsSize="large">
//           <ControlLabel>Password</ControlLabel>
//           <FormControl
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             type="password"
//           />
//         </FormGroup>
//         <Button block bsSize="large" disabled={!validateForm()} type="submit">
//           Login
//         </Button>
//       </form>
//     </div>
//   );
// }

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import API_URL from "../apicommon";
export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
  
          email: null,
          password: null,

        }
       
      }

      componentDidMount(){
        
        const token=localStorage.getItem("token");
        
        if (token){
          const user=localStorage.getItem("user")
          console.log("logged user ",user)
          if(user.role_id===1)
               this.props.history.push('/adminPage');
          else this.props.history.push('/student');
          }
            
      }

      handleChange =(e) =>{
          const name= e.target.name;
          const value=e.target.value;
          this.setState({
              [name]:value
          })
      }


     handleSubmit=(e)=>{
          e.preventDefault();
          //console.log("state",this.state);
          const data= this.state;
          
      axios.post(API_URL+'login', data)
      .then(res => {
        localStorage.setItem('token', res.data.access_token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        if(res.data.user.role_id===1)
             this.props.history.push('/adminPage')
        else this.props.history.push('/student')
        
      }).catch((err)=>{
        console.log("logging error type ",err.message);
          let bl=document.getElementById("error")
          let msg=err.message.includes("401")?"Login/Password invalid":"Network Error. Check your network and retry."
          bl.innerHTML="<p>"+msg+"</p>"
          //bl.style.display="block"
      })


      }
    
    render() {
        /*const token=localStorage.getItem('token');
        if (token){
        const user=localStorage.getItem("user")

        if(user.role_id===1)
             return <Redirect to='/course'/>;
        else return <Redirect to='/student'/>;
        }*/
        return (
            <div id="container" className="login-container">
            <div className="vacenter" >
            <p className="appName">SOMA APP</p><br/>
            <p className="myAuth">Authentification Page</p>
            <hr style={{width:"150px"}}/><br/>

            <div className="myContent">
                <p>Enter your username and your password to log in</p> <br/>
                <div className="myLogin">
                <form onSubmit={this.handleSubmit}>
                    <p><input className="form-control" type="email" name="email" onChange={this.handleChange} placeholder="Enter email" /></p>
                    
                    <p><input className="form-control" type="password" name="password" onChange={this.handleChange} placeholder="Enter password"/></p><br/>
                    <p><button className="btn btn-primary btn-block" type="submit">Sign In</button></p>
					<p> 
						<input type="checkbox" name="remember-me" value="remember-me" id="remember-me" /> 
                        <label className="bold-font" htmlFor="remember-me">Remember me</label>
					</p>
                    <a style={{color:"white",textAlign:"center",fontSize:"medium",marginLeft:"30%"}} href="/sign-up">Create your account</a>
                    </form>
                    <div id="error" className="tips_wrap" style={{display:"block"}}>
                       
                    </div>
                </div><br/>
            </div>
            </div>
        </div>

            /*<form  onSubmit ={this.handleSubmit}>
                <div className="auth-wrapper">
        <div className="auth-inner">
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="email" onChange={this.handleChange} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password"  name= "password" onChange={this.handleChange} className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="www.facebook.com">password?</a>
                </p>
                </div>
                </div>
        </form>*/
        
        
        );
    }
}
	