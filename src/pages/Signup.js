import React from "react";
import {signup} from "../utils/auth"
import "../stylesheets/signup.css"

export default class Signup extends React.Component {
    constructor(props){
        super(props)
        this.handleInput = this.handleInput.bind(this)
        this.handleSignup = this.handleSignup.bind(this)
    }
    state = {
        user: {
            username: "",
            name: "",
            email: "",
            password: ""
        },
    }
    handleInput(event){
        let userCopy = {...this.state.user}
        userCopy[event.target.name] = event.target.value
        this.setState({
            user: userCopy
        })
    }
    handleSignup(){
        signup(this.state.user)
        .then(() => {
                this.props.history.push("/login")
            })
        .catch((error) => {
            // handle error
            console.log(error)
        })
    }
    render(){
        return (
            <div className="form">
                <div className="input-field">
                    <label>Username</label>
                    <div>
                        <input 
                        onChange={this.handleInput}
                        value={this.state.username}
                        name="username"
                        type="text"
                        placeholder="username"
                        />
                    </div>
                </div>
                <div className="input-field">
                    <label>Name</label>
                    <div>
                        <input 
                        onChange={this.handleInput}
                        value={this.state.name}
                        name="name"
                        type="text"
                        placeholder="name"
                        />
                    </div>
                </div>
                <div className="input-field">
                    <label>E-mail</label>
                    <div>
                        <input 
                        onChange={this.handleInput}
                        value={this.state.email}
                        name="email"
                        type="text"
                        placeholder="email"
                        />
                    </div>
                </div>
                <div className="input-field">
                    <label>Password</label>
                    <div>
                        <input 
                        onChange={this.handleInput}
                        value={this.state.password}
                        name="password"
                        type="password"
                        placeholder="password"
                        />
                    </div>
                </div>
                <button
                    className="signup-button"
                    onClick={this.handleSignup}>
                    Sign Up
                </button>
            </div>
        )
    }
}