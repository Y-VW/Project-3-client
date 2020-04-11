import React, { Component } from "react";
import { getUser } from "../utils/auth";
// import {searchPlants} from  '../utils/api'
import Axios from "axios";
// import AddPlant from "module";
import { Redirect, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userPlants: [],
    };
  }
  componentDidMount() {
    Axios({
      method: "GET",
      url: "http://localhost:3000/userPlants",
      withCredentials: true,
    })
      .then((response) => {
        console.log(response.data);
        this.setState({ userPlants: response.data.userPlants });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    let user = getUser();
    let userPlants = this.state.userPlants;
    return (
      <div>
        {!user ? (
          <Redirect to="/login" />
        ) : (
          <div>
            <h1>Welcome {user.username}</h1>
            <div>
              <p>This are the plant you are offering at the moment:</p>

              <div class="card-deck">
                {userPlants.map((plant, index) => {
                  return (
                    <div class="card">
                      <img
                        class="card-img-top"
                        src={plant.imgPath}
                        alt="Card image cap"
                      />
                      <div class="card-body">
                        <h4 key={index} class="card-title">
                          {plant.title}
                        </h4>
                      </div>
                      <div class="card-footer">
                      <button className="btn btn-danger">Remove</button>
                        {/* <small class="text-muted">
                          Last updated 3 mins ago
                        </small> */}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div>
                <Link to="/add-plant" className="caption btn btn-success">
                  Add another plant
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Profile);
