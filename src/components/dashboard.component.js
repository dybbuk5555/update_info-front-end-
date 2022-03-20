import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import AuthVerify from "../common/auth-verify";
import CNAE from "../services/cnae";
import Register from "../services/register";
import Principle from "../services/principle";
import EventBus from "../common/EventBus";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: undefined,
      cnae: undefined,
      register: undefined,
      principle: undefined
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    const cnae = CNAE();
    const register = Register();
    const principle = Principle();
    
    if (!currentUser) this.setState({ redirect: "/" });
    this.setState({ 
      currentUser: currentUser, 
      userReady: true,
      cnae: cnae,
      register: register,
      principle: principle 
    });

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser, cnae, register, principle } = this.state;

    return (
      <>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="/" className="nav-link" onClick={this.logOut}>
                LogOut
              </a>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          {(this.state.userReady) ?
            <div>
              <header className="jumbotron">
                <h3>
                  <strong>{currentUser.username}</strong> {cnae[0]}
                </h3>
              </header>
              <p>
                <strong>Token:</strong>{" "}
                {currentUser.accessToken.substring(0, 20)} ...{" "}
                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
              </p>
            </div> : null}
        </div>
        <AuthVerify logOut={this.logOut} />
      </>
    );
  }
}
