import React, { Component } from "react";
import UserContext from "./user";


export default class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      account: null,
      canConnectWithAccessCode: false,
      isAuthenticated: false,
      categorization: null,
      letEnter: false,
      newSupervisor: null,
    };
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          setUser: (user) => {
            this.setState({
              user,
            });
          },
          account: this.state.account,
          setAccount: (account) => {
            this.setState({
              account,
            });
          },

          newSupervisor: this.state.newSupervisor,
          setNewSupervisor: (newSupervisor) => {
            this.setState({
              newSupervisor,
            });
          },

          canConnectWithAccessCode: this.state.canConnectWithAccessCode,
          setCanConnectWithAccessCode: (canConnectWithAccessCode) => {
            this.setState({
              canConnectWithAccessCode,
            });
          },

          isAuthenticated: this.state.isAuthenticated,
          setIsAuthenticated: (isAuthenticated) => {
            this.setState({
                isAuthenticated,
            });
          },

          categorization: this.state.categorization,
          setCategorization: (categorization) => {
            this.setState({
              categorization,
            });
          },

          letEnter: this.state.letEnter,
          setLetEnter: (letEnter) => {
            this.setState({
              letEnter,
            });
          },
          
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
