import React, { Component } from "react";
import NewReservationContext from "./new-reservation";

export default class NewReservationProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newReservation: null,
    };
  }

  render() {
    return (
      <NewReservationContext.Provider
        value={{
          newReservation: this.state.newReservation,
          setNewReservation: (newReservation) => {
            this.setState({
              newReservation,
            });
          },
        }}
      >
        {this.props.children}
      </NewReservationContext.Provider>
    );
  }
}
