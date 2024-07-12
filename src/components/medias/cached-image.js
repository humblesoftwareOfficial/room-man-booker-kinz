import React, { Component, PureComponent } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Crypto from "expo-crypto";

export default class CachedImage extends PureComponent {
  state = {
    imgURI: "",
    isLoading: true,
  };

  thumbnailAnimated = new Animated.Value(0);
  imageAnimated = new Animated.Value(0);

  handleThumbnailLoad = () => {
    Animated.timing(this.thumbnailAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  onImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  async componentDidMount() {
    const filesystemURI = await this.getImageFilesystemKey(
      this.props.source.uri
    );
    await this.loadImage(filesystemURI, this.props.source.uri);
  }

  async componentDidUpdate() {
    const filesystemURI = await this.getImageFilesystemKey(
      this.props.source.uri
    );
    if (
      this.props.source.uri === this.state.imgURI ||
      filesystemURI === this.state.imgURI
    ) {
      return null;
    }
    await this.loadImage(filesystemURI, this.props.source.uri);
  }

  async getImageFilesystemKey(remoteURI) {
    const hashed = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      remoteURI
    );
    return `${FileSystem.cacheDirectory}${hashed}`;
  }

  async loadImage(filesystemURI, remoteURI) {
    try {
      // Use the cached image if it exists
      const metadata = await FileSystem.getInfoAsync(filesystemURI);
      if (metadata.exists) {
        this.setState({
          imgURI: filesystemURI,
        });

        return;
      }

      // otherwise download to cache
      const imageObject = await FileSystem.downloadAsync(
        remoteURI,
        filesystemURI
      );
      
      this.setState({
        imgURI: imageObject.uri,
      });
    } catch (err) {
      console.log("Image loading error:", err);
      this.setState({ imgURI: remoteURI });
    }
  }

  render() {
    const {
      thumbnailSource,
      source,
      style,
      square,
      squareValue,
      radius,
      onLoadEnd,
      flex,
      backgroundColor = "#FFF",
      ...props
    } = this.props;
    return (
      <View
        style={[
          styles.container,
          { borderRadius: square ? squareValue : radius, backgroundColor },
        ]}
      >
        <Animated.Image
          {...props}
          source={thumbnailSource}
          style={style}
          blurRadius={2}
          onLoad={this.handleThumbnailLoad}
        />
        <Animated.Image
          {...props}
          source={this.state.imgURI ? { uri: this.state.imgURI } : null}
          style={[styles.imageOverlay, style]}
          onLoad={this.onImageLoad}
          onLoadEnd={() => onLoadEnd && onLoadEnd()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    backgroundColor: "#424242", //#424242 e1e4e8
    flex: 1,
  },
});
