import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../../services/auth.service";
import AuthVerify from "../../common/auth-verify";
import CNAE from "../others/cnae";
import Register from "../others/register";
import Annuity from "../others/annuity";
import Table from "../others/Table";
import EventBus from "../../common/EventBus";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: undefined,
      cnae: "",
      register: "",
      annuity: "",
      selectedOption: false
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    localStorage.setItem("cnae", "");
    localStorage.setItem("register", "");
    localStorage.setItem("annuity", "");

    if (!currentUser) this.setState({ redirect: "/" });
    this.setState({
      currentUser: currentUser,
      userReady: true,
    });

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  handleOptionChange = (e) => {
    if (e.target.value === "true") {
      this.setState({
        selectedOption: true
      });
    } else {
      this.setState({
        selectedOption: false
      })
    }
  }

  filter = (e) => {
    this.setState({
      cnae: localStorage.getItem("cnae"),
      register: localStorage.getItem("register"),
      annuity: localStorage.getItem("annuity")
    });
  }

  format = (e) => {

  }

  logOut = () => {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

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
          <div className="jumbotron">
            <CNAE />
            <div className="col-md-6 m-auto">
              <div className="d-flex justify-content-around">
                <div className="radio">
                  <label>
                    COM REGISTRO REGIONAL
                    <input
                      type="radio"
                      value="false"
                      checked={!this.state.selectedOption}
                      onChange={this.handleOptionChange} />
                  </label>
                </div>
                <div className="radio">
                  <label>
                    SEM REGISTRO REGIONAL
                    <input
                      type="radio"
                      value="true"
                      checked={this.state.selectedOption}
                      onChange={(this.handleOptionChange)} />
                  </label>
                </div>
              </div>
            </div>
            <Register isDisabled={this.state.selectedOption} />
            <div className="p-2"></div>
            <Annuity isDisabled={this.state.selectedOption} />
            <div className="p-2"></div>
            <div className="col-md-6 m-auto">
              <div className="d-flex justify-content-around">
                <button type="button" className="btn btn-secondary" onClick={this.filter}>CONSULTAR</button>
                <button type="button" className="btn btn-secondary" onClick={this.format}>LIMPAR CAMPOS</button>
              </div>
            </div>
          </div>
          <div className="jumbotron">
            <Table cnae={this.state.cnae} register={this.state.register} annuity={this.state.annuity} />      
          </div>
        </div>
        <AuthVerify logOut={this.logOut} />
      </>
    );
  }
}
