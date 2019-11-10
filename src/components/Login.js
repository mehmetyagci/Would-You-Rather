import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dropdown} from 'semantic-ui-react';

import {setAuthedUser} from '../actions/authedUser';

class Login extends Component {
  state = {
    userId: null,
    loginFail: false,
  };

  handleSelectUser = (event, data) => {
    console.log ('Login->handleSelectUser->data.value:', data.value);
    this.setState ({userId: data.value, loginFail: false});
  };

  handleLogin = () => {
    const {userId} = this.state;
    console.log ('Login->handleLogin->userId:', userId);
    const {setAuthedUser} = this.props;
    console.log ('Login->handleLogin->setAuthedUser:', setAuthedUser);
    if (userId) {
      setAuthedUser (userId);
      this.setState ({
        loginFail: false,
      });
    } else {
      this.setState ({
        loginFail: true,
      });
      return;
    }
  };

  render () {
    console.log ('Login->this.props', this.props);

    const {users} = this.props;
    const {userId} = this.state;

    if (!users) {
      return <p>Users not found!</p>;
    }

    const userOptions = Object.keys (users).map (user => ({
      key: user,
      value: user,
      text: users[user].name,
      image: {avatar: true, src: users[user].avatarURL},
    }));

    return (
      <div className="ui container" style={{marginTop: '50px'}}>
        <div className="ui middle aligned center aligned grid">
          <div className="column">
            <h2 className="ui image header">
              <div className="content">Log-in</div>
            </h2>

            <form className="ui large form">
              <div className="ui raised segment">
                <div className="field">
                  <Dropdown
                    placeholder="Select User"
                    fluid
                    selection
                    options={userOptions}
                    onChange={this.handleSelectUser}
                  />
                </div>

                {this.state.loginFail &&
                  <div
                    className="ui error message"
                    style={{
                      display: this.state.loginFail ? 'block' : 'none',
                    }}
                  >
                    <p>Please Select User!</p>
                  </div>}

                <div
                  className={
                    'ui fluid large submit button teal ' +
                      (userId === null || userId === '' ? 'disabled' : '')
                  }
                  onClick={this.handleLogin}
                >
                  Login
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({users}) {
  //console.log("mapStateToProps", users);
  return {
    users,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    setAuthedUser: id => {
      dispatch (setAuthedUser (id));
    },
  };
}

export default connect (mapStateToProps, mapDispatchToProps) (Login);
