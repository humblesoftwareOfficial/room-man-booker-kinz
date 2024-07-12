import React, { Component } from "react";
import NewRoomContext from "./new-room";


export const newItemMedia = (index) => ({
  code: `${index}-`,
  label: "",
  price: "",
  image: {
    uri: "",
    base64: null,
  },
});

export default class NewRoomProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRoom: null,
      medias: new Array(10).fill(undefined).map((_, idx) => newItemMedia(idx)),
      updatedRoom: null,
    };
  }

  render() {
    return (
      <NewRoomContext.Provider
        value={{
          newRoom: this.state.newRoom,
          setNewRoom: (newRoom) => {
            this.setState({
              newRoom,
            });
          },
          medias: this.state.medias,
          setMedias: (medias) => {
            this.setState({
              medias,
            });
          },
          updatedRoom: this.state.updatedRoom,
          setUpdatedRoom: (updatedRoom) => {
            this.setState({
              updatedRoom,
            });
          },
        }}
      >
        {this.props.children}
      </NewRoomContext.Provider>
    );
  }
}
