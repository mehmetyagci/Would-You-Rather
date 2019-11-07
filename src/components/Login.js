import React, { Component } from "react";
import { connect } from "react-redux";

class Login extends Component {
  render() {
    console.log("Login->this.props", this.props);
    return (
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <h2 className="ui image header">
            <div className="content">Log-in</div>
          </h2>
          <form action="#" method="get" className="ui large form">
              
            <div className="ui fluid selection dropdown ui simple dropdown items ">
              <input type="hidden" name="user" />
              <i className="dropdown icon" />
              <div className="default text">Select Friend</div>
              <div className="menu">
                <div className="item" data-value="jenny">
                  Jenny Hess
                </div>
                <div className="item" data-value="elliot">
                  Elliot Fu
                </div>
                <div className="item" data-value="stevie">
                  Stevie Feliciano
                </div>
                <div className="item" data-value="christian">
                  Christian
                </div>
                <div className="item" data-value="matt">
                  Matt
                </div>
                <div className="item" data-value="justen">
                  Justen Kitsune
                </div>
              </div>
            </div>

            <div className="ui fluid large submit button teal ">Login</div>

            <div className="ui error message"></div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  console.log("mapStateToProps", users);

  return {
    users
  };
}

export default connect(mapStateToProps)(Login);
