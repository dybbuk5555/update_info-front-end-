import React, { Component } from "react";
import axios from "axios";
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

    this.filter = this.filter.bind(this);
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: null,
      cnae: "",
      register: "",
      annuity: "",
      selectedOption: false,
      updateTime: ""
    };
  }

  componentDidMount() {
    this.currentUser();
    this.getOptions();

    localStorage.setItem("cnae", "");
    localStorage.setItem("register", "");
    localStorage.setItem("annuity", "");

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  async getOptions() {
    const config = {
      method: 'get',
      url: 'http://localhost:8080',
    };

    let updateTime = await axios(config)
    this.setState({
      updateTime: updateTime.data.updateTime
    })
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

  async currentUser() {
    await this.setState({
      currentUser: JSON.parse(localStorage.getItem("user")).username,
      userReady: true,
    });
  }

  async filter() {
    await this.setState({
      cnae: localStorage.getItem("cnae"),
      register: localStorage.getItem("register"),
      annuity: localStorage.getItem("annuity")
    });
  }

  logOut = () => {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    return (
      <>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="col-md-2"></div>
          <div className="navbar-nav col-md-8 d-flex justify-content-center">
            <div className="nav-item text-light mt-1 ">
              <h4 >RELATÓRIO DE EMPRESAS - BUSCA POR CNAE/REGISTRO</h4>
            </div>
          </div>
          <div className="navbar-nav col-md-2 d-flex justify-content-end">
            <li className="nav-item text-light mt-1 mr-4">
              <h4>{this.state.currentUser}</h4>
            </li>
            <li className="nav-item" >
              <a href="/" className="nav-link text-light" onClick={this.logOut}>
                LogOut
              </a>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <div className="jumbotron pb-4">
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
              </div>
            </div>
          </div>
          <div className="jumbotron p-4">
            <Table cnae={this.state.cnae} register={this.state.register} annuity={this.state.annuity} />
          </div>
        </div>
        <nav className="navbar navbar-expand navbar-dark bg-grey">
          <div className="col-md-4"></div>
          <div className="col-md-4 navbar-nav d-flex justify-content-center">
            <div className="nav-item text-dark text-center">
              <h6 className="mb-0">SISTEMA DE GESTÃO CONSULTA</h6>
              <h6 className="mb-0">2022</h6>
            </div>
          </div>
          <div className="navbar-nav col-md-4 d-flex justify-content-end">
            <li className="nav-item text-dark mt-1">
              <h6>Data de atualização mais recente: {this.state.updateTime}</h6>
            </li>
          </div>
        </nav>
        <AuthVerify logOut={this.logOut} />
      </>
    );
  }
}
