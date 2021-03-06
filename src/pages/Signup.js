import React from "react";
import { signup } from "../utils/auth";
import "../stylesheets/signup.css";
import { validate } from "isemail";
import zxcvbn from "zxcvbn";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import 'react-google-places-autocomplete/dist/index.min.css';
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleAddressInput = this.handleAddressInput.bind(this);
    this.turnIntoCoordinates = this.turnIntoCoordinates.bind(this);

    const { minStrength = 2, thresholdLength = 8 } = props;

    // minStrength is the minimum strength of password. The number is between 0 and 4
    this.minStrength =
      typeof minStrength === "number"
        ? Math.max(Math.min(minStrength, 4), 0)
        : 2;

    // thresholdLength is the minimum length of password
    this.thresholdLength =
      typeof thresholdLength === "number" ? Math.max(thresholdLength, 8) : 8;
  }
  state = {
    user: {
      username: "",
      name: "",
      email: "",
      password: "",
      address: "",
      lat: "",
      lng: ""
    },
    error: "",
    strength: 0,
  };

  handleInput(event) {
    let userCopy = { ...this.state.user };
    userCopy[event.target.name] = event.target.value;
    this.setState({
      user: userCopy,
    });
  }

  handleAddressInput(value) {
    let userCopy = { ...this.state.user };
    userCopy.address = value.description;
    console.log("This is the address:", value.description)
    this.turnIntoCoordinates(value.description);
    this.setState({
      user: userCopy,
    });
  }

  turnIntoCoordinates(value) {
    geocodeByAddress(value)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        let userCopy = { ...this.state.user };
        userCopy.lat = lat
        userCopy.lng = lng
        this.setState({
          user: userCopy,
        })
        console.log("Successfully got latitude and longitude", { lat, lng })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  validatePasswordStrong(value) {
    console.log(zxcvbn(value).score);
    // ensure password is long enough
    if (value.length <= this.thresholdLength) {
      this.setState({
        error: "Password is too short",
      });
      return false;
    }
    // ensure password is strong enough using the zxcvbn library
    if (zxcvbn(value).score < this.minStrength) {
      this.setState({
        error: "Password is too weak",
      });
      return false;
    }
    if (
      value.length >= this.thresholdLength &&
      zxcvbn(value).score > this.minStrength
    ) {
      return true;
    }
  }

  handleSignup() {
    if (!validate(this.state.user.email)) {
      console.log("Email is invalid");
      this.setState({
        error: "Email is invalid",
      });
    } else if (
      this.validatePasswordStrong(this.state.user.password) === false
    ) {
      console.log("Invalid password");
    } else {
      // console.log("THis is the new user: ", this.state.user)
      signup(this.state.user)
        .then(() => {
          this.props.history.push("/login");
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container" id="sign-up">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-4">Welcome!</h3>
                    <div className="form-group">
                      <label>Username</label>
                      <div>
                        <input
                          onChange={this.handleInput}
                          value={this.state.username}
                          name="username"
                          type="text"
                          placeholder="username"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Name</label>
                      <div>
                        <input
                          onChange={this.handleInput}
                          value={this.state.name}
                          name="name"
                          type="text"
                          placeholder="name"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>E-mail</label>
                      <div>
                        <input
                          onChange={this.handleInput}
                          value={this.state.email}
                          name="email"
                          type="text"
                          placeholder="email"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    {/* <div className="form-group">
                      <label>City</label>
                      <div>
                        <input
                          onChange={this.handleInput}
                          value={this.state.city}
                          name="city"
                          type="text"
                          placeholder="city"
                          className="form-control"
                          required
                        />
                      </div>
                    </div> */}
                    <div className="form-group">
                      <label>Home Address</label>
                      <div >
                        <GooglePlacesAutocomplete
                          
                          // onSelect={console.log}
                          onSelect={this.handleAddressInput}
                          className="address-field"
                        />

                        {/* <input
                          onChange={this.handleInput}
                          value={this.state.city}
                          name="city"
                          type="text"
                          placeholder="city"
                          className="form-control"
                          required
                        /> */}
                      </div>
                    </div>
                    {/* <div className="form-group">
                      <label>Country</label>
                      <div>
                        <input
                          onChange={this.handleInput}
                          value={this.state.country}
                          name="country"
                          type="text"
                          placeholder="country"
                          className="form-control"
                          required
                        />
                      </div>
                    </div> */}
                    <div className="form-group">
                      <label>Password</label>
                      <div>
                        <input
                          onChange={this.handleInput}
                          value={this.state.password}
                          name="password"
                          type="password"
                          placeholder="password"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <button
                      className="btn-success btn"
                      onClick={this.handleSignup}
                    >
                      Sign Up
                    </button>
                    <div id="pswd_info">
                      <h4>Password must meet the following requirements:</h4>
                      <ul>
                        <li id="letter" className="invalid">
                          At least <strong>one letter</strong>
                        </li>
                        <li id="capital" className="invalid">
                          At least <strong>one capital letter</strong>
                        </li>
                        <li id="number" className="invalid">
                          At least <strong>one number</strong>
                        </li>
                        <li id="length" className="invalid">
                          Be at least <strong>8 characters</strong>
                        </li>
                        <li id="sequence" className="invalid">
                          No sequence of numbers, such as 12345
                        </li>
                      </ul>
                    </div>
                    {this.state.error && (
                      <div className="errors">
                        <h3>{this.state.error}</h3>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
